<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MtnMobileMoneyService
{
    private string $baseUrl;
    private string $subscriptionKey;
    private string $userApi;
    private string $apiKey;

    public function __construct()
    {
        $this->baseUrl = env('MTN_MOMO_BASE_URL', 'https://sandbox.momodeveloper.mtn.com');
        $this->subscriptionKey = env('MTN_MOMO_SUBSCRIPTION_KEY');
        $this->userApi = env('MTN_MOMO_USER_API');
        $this->apiKey = env('MTN_MOMO_API_KEY');
    }

    /**
     * Obtenir un token d'accès.
     *
     * @return string|null
     */
    public function getAccessToken()
    {
        // Vérifier si un token valide existe dans le cache
        $cachedToken = Cache::get('mtn_momo_access_token');

        if ($cachedToken) {
            return $cachedToken;
        }

        try {
            $credentials = base64_encode($this->userApi . ':' . $this->apiKey);

            $response = Http::withHeaders([
                'Authorization' => 'Basic ' . $credentials,
                'Ocp-Apim-Subscription-Key' => $this->subscriptionKey,
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '/collection/token/');

            if ($response->successful()) {
                $token = $response->json()['access_token'];
                $expiresIn = $response->json()['expires_in']; // Temps en secondes

                // Stocker le token dans le cache avec une durée légèrement inférieure à son expiration
                Cache::put('mtn_momo_access_token', $token, now()->addSeconds($expiresIn - 60));

                return $token;
            }

            Log::error('Erreur lors de la génération du token d\'accès : ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('Exception lors de la génération du token d\'accès : ' . $e->getMessage());
            return null;
        }
    }


    /**
     * Initier un paiement via MTN Mobile Money.
     *
     * @param string $phoneNumber
     * @param float $amount
     * @param string $externalId
     * @param string $payerMessage
     * @param string $payeeNote
     * @return array|null
     */
    public function initiatePayment(string $phoneNumber, string $amount, string $referenceId, string $payerMessage = 'Payment', string $payeeNote = 'Subscription')
    {
        $accessToken = $this->getAccessToken();

        if (!$accessToken) {
            return null;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $accessToken,
                'X-Target-Environment' => 'sandbox',
                'X-Reference-Id' => $referenceId,
                'Ocp-Apim-Subscription-Key' => $this->subscriptionKey,
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '/collection/v1_0/requesttopay', [
                'amount' => $amount,
                'currency' => 'EUR',
                'externalId' => $referenceId,
                'payer' => [
                    'partyIdType' => 'MSISDN',
                    'partyId' => $phoneNumber,
                ],
                'payerMessage' => $payerMessage,
                'payeeNote' => $payeeNote,
            ]);


            if ($response->successful()) {
                Log::debug('donnee du paiement' . $response);
                return [
                    'status' => 'SUCCESS',
                    'data' => $response
                ];
            }

            Log::error('Erreur lors de l\'initiation du paiement : ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('Exception lors de l\'initiation du paiement : ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Vérifier le statut d'un paiement.
     *
     * @param string $transactionId
     * @return array|null
     */
    public function checkPaymentStatus(string $transactionId)
    {
        $accessToken = $this->getAccessToken();

        if (!$accessToken) {
            return null;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $accessToken,
                'Ocp-Apim-Subscription-Key' => $this->subscriptionKey,
                'X-Target-Environment' => 'sandbox',
                'referenceId' => $transactionId,
            ])->get($this->baseUrl . "/collection/v1_0/requesttopay/{$transactionId}");

            if ($response->successful()) {
                Log::debug($response);
                return $response->json();
            }

            Log::error('Erreur lors de la vérification du statut de paiement : ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('Exception lors de la vérification du statut de paiement : ' . $e->getMessage());
            return null;
        }
    }
}
