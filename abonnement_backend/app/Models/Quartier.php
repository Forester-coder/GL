<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quartier extends Model
{
    use HasFactory;

    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'description'
    ];

    /**
     * Les depotoirs associés à ce quartier.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    function depotoirs(): HasMany
    {
        return $this->hasMany(Depotoir::class);
    }

    /**
     * Les utilisateurs associés à ce quartier.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
