<?php

namespace App\Http\Controllers;

use App\Services\MtnMobileMoneyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    protected $momoService;

    public function __construct(MtnMobileMoneyService $momoservice)
    {
        $this->momoService = $momoservice;
    }

    public function initiatePayment(Request $request)
    {
        $validated = $request->validate([
            'phone_number' => 'required|string',
            'amount' => 'required|numeric|min:1',
        ]);

        $transactionId  = Str::uuid()->toString();
        Log::debug($transactionId);
        $response =  $this->momoService->initiatePayment(
            $validated['phone_number'],
            $validated['amount'],
            $transactionId
        );


        // dd($response);
        if ($response['status'] == 'SUCCESS') {
            return response()->json([
                'transactionId' => $transactionId,
                'message' => 'Payment initiated successfully.',
                'data' => $response['data'],
            ]);
        }

        return response()->json([
            'message' => 'Payment initiation failed.',
            'error' => $response['error'],
        ], 400);
    }

    public function checkPaymentStatus($transactionId)
    {
        $response = $this->momoService->checkPaymentStatus($transactionId);

        if ($response['status'] == 'SUCCESSFUL') {
            return response()->json([
                'status' => 'success',
                'message' => 'Payment status retrieved successfully.',
                'data' => $response,
            ]);
        }

        return response()->json([
            'message' => 'Failed to retrieve payment status.',
            'error' => $response['error'],
        ], 400);
    }
}
