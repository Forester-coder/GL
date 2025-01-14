<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubscriptionPlan extends Model
{


    protected $fillable = [
        'name',
        'price',
        'duration',
        'features',
    ];


    function subscription(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }
}
