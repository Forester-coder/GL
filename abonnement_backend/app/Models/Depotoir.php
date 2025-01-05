<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Depotoir extends Model
{
    use HasFactory;

    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'latitude',
        'longitude',
        'quartier_id'
    ];

    /**
     * quartier liee au depotoir.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    function quartier(): BelongsTo
    {
        return $this->belongsTo(Quartier::class);
    }
}
