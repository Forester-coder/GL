<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

class SubscriptionPlanController extends Controller
{


    public function index()
    {
        return response()->json(SubscriptionPlan::all(), 200);
    }

    public function store(Request $request)
    {
        // Valide les données du formulaire
        $validated = $request->validate([
            'name' => 'required|string|unique:subscription_plans,name|max:255',
            'price' => 'required|decimal',
            'duration' => 'required|integer',
            'features' => 'json'
        ]);

        // Crée un nouveau quartier avec les données validées
        $subscriptionPlan =  SubscriptionPlan::create($validated);

        return response()->json($subscriptionPlan, 201);
    }


    public function show(string $id)
    {
        $subscriptionPlan = SubscriptionPlan::find($id);

        if (!$subscriptionPlan) {
            return response()->json(['message' => 'Subscriptio nPlan not found'], 404);
        }

        return response()->json($subscriptionPlan, 200);
    }


    public function update(Request $request, string $id)
    {

        $subscriptionPlan = SubscriptionPlan::find($id);

        if (!$subscriptionPlan) {
            return response()->json(['message' => 'Subscription Plan not found'], 404);
        }

        // Valide les données du formulaire de modification
        $validated = $request->validate([
            'name' => 'required|string|unique:subscription_plans,name,' . $subscriptionPlan->id . '|max:255',
            'price' => 'required|decimal',
            'duration' => 'required|integer',
            'features' => 'json'
        ]);

        // Met à jour le quartier avec les données validées
        $subscriptionPlan->update($validated);

        // Redirige vers l'index avec un message de succès
        return response()->json($subscriptionPlan, 200);
    }


    public function destroy(string $id)
    {
        $subscriptionPlan = SubscriptionPlan::find($id);

        if (!$subscriptionPlan) {
            return response()->json(['message' => 'Subscription Plan not found'], 404);
        }

        $subscriptionPlan->delete();

        return response()->json(['message' => 'Subscription Plan deleted successfully'], 200);
    }
}
