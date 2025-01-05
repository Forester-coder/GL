<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('payment_methods')->insert([
            ['name' => 'MTN Mobile Money', 'description' => 'Paiement via MTN Mobile Money', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Orange Money', 'description' => 'Paiement via Orange Money', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Carte Bancaire', 'description' => 'Paiement via carte bancaire', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
