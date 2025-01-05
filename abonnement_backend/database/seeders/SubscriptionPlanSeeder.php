<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('subscription_plans')->insert([
            ['name' => 'Plan Mensuel', 'price' => 5000, 'duration' => 30, 'features' => json_encode(['Accès complet', 'Support 24/7']), 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Plan Trimestriel', 'price' => 14000, 'duration' => 90, 'features' => json_encode(['Accès complet', 'Support prioritaire']), 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Plan Annuel', 'price' => 50000, 'duration' => 365, 'features' => json_encode(['Accès VIP', 'Support Premium', 'Rapports personnalisés']), 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
