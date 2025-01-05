<?php

namespace App\Http\Controllers;

use App\Jobs\VerifyPaymentRepeatedlyJob;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\Subscription;
use App\Models\SubscriptionPlan;
use App\Services\MtnMobileMoneyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

use function Psy\debug;

class MomoPayController extends Controller
{

    protected $momoService;

    public function __construct(MtnMobileMoneyService $momoservice)
    {
        $this->momoService = $momoservice;
    }

    public function initiatePayment(Request $request)
    {
        Log::debug($request);
        $validated = $request->validate([
            'planId' => 'required',
            'phoneNumber' => 'required|string',
        ]);

        Log::debug('hello');


        $plan =  SubscriptionPlan::find($validated['planId']);
        $user = Auth::user();

        $transactionId  = Str::uuid()->toString();

        $response =  $this->momoService->initiatePayment(
            (string)$validated['phoneNumber'],
            (string)$plan->price,
            $transactionId
        );

        // dd($response);
        if ($response['status'] == 'SUCCESS') {

            $subscription = Subscription::create(
                [
                    'user_id' => $user->id,
                    'start_date' => now(),
                    'end_date' => now()->addDays($plan->duration),
                    'statuts' => 'PENDING',
                    'plan_id' => $plan->id,
                ]
            );

            $payment = Payment::create([
                'subscription_id' => $subscription->id,
                'payment_method_id' => 1,
                'amount' => $plan->price,
                'payment_date' => now(),
                'statuts' => 'PENDING',
                'transactionId' =>  $transactionId ,
            ]);

        

            return response()->json([
                'transactionId' => $transactionId,
                'message' => 'Payment initiated successfully.',
                'data' => $response['data'],
                'subscription' => $subscription,
                'payment' => $payment,
            ]);
        }

        return response()->json([
            'message' => 'Payment initiation failed.',
            'error' => $response['error'],
        ], 400);
    }
}