<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subscription extends Model
{
    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'statuts',
        'plan_id',
    ];

    /**
     * L'utilisateur qui a effectuer l'abonnement.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    function subscriptionPlan(): BelongsTo
    {
        return $this->belongsTo(SubscriptionPlan::class, 'plan_id');
    }


    function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    function payments(): HasMany
    {
        return $this->hasMany(PaymentMethod::class);
    }
}
