<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'is_active'];

    function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    function payment(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
