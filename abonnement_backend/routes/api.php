<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepotoirController;
use App\Http\Controllers\MomoPayController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\QuartierController;
use App\Http\Controllers\SubscriptionPlanController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');


Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('payment-methods', PaymentMethodController::class);
    Route::apiResource('quartiers', QuartierController::class);
    Route::apiResource('depotoirs', DepotoirController::class);
    Route::apiResource('subscription-plan', SubscriptionPlanController::class);


    Route::post('/momo-pay', [MomoPayController::class, 'initiatePayment']);
});


Route::post('/payments/initiate', [PaymentController::class, 'initiatePayment']);
Route::get('/payments/status/{transactionId}', [PaymentController::class, 'checkPaymentStatus']);
