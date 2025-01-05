<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = ['subscription_id', 'payment_method_id', 'amount', 'payment_date', 'statuts' , 'transactionId' , 'verification_attempts'];

    function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }


    function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }
}
