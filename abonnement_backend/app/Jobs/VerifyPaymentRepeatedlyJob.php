<?php

namespace App\Jobs;

use App\Models\Payment;
use App\Services\MtnMobileMoneyService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class VerifyPaymentRepeatedlyJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, SerializesModels;

    protected $paymentId;
    protected $momoService;
    /**
     * Create a new job instance.
     */
    public function __construct($paymentId, MtnMobileMoneyService $momoservice)
    {
        $this->paymentId = $paymentId;
        $this->momoService = $momoservice;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $payment = Payment::find($this->paymentId);

        if (!$payment || $payment->status !== 'PENDING') {
            Log::debug('Arrête la job si le paiement n\'existe pas ou n\'est plus en attente');
            return; // Arrête la job si le paiement n'existe pas ou n'est plus en attente
        }

        // Vérifiez si le délai des 10 minutes est dépassé
        if (now()->diffInSeconds($payment->created_at) >= 600) {
            $payment->update(['status' => 'FAILED']);
            Log::warning('Paiement échoué après délai.', ['payment_id' => $this->paymentId]);
            return;
        }

        // Vérifiez le statut via l'API
        $status = $this->momoService->checkPaymentStatus($payment->transactionId);

        if ($status['status'] === 'SUCCESSFUL') {
            $payment->update(['status' => 'SUCCESS']);
            $subscription = $payment->subscription;
            $subscription->update(['status' => 'ACTIVE']);
            Log::info('Paiement validé.', ['payment_id' => $this->paymentId]);
            return;
        }

        // Replanifier la Job après 2 secondes si toujours en attente
        self::dispatch($this->paymentId)->delay(now()->addSeconds(2));
    }
}
