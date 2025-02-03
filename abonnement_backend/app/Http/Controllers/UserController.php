<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{



    public function subscriptions($id)
    {
        $user = User::findOrFail($id);

        $subscriptions = $user->subscriptions()->with('subscriptionPlan')->get();

        return response()->json([
            'subscriptions' => $subscriptions,
        ]);
    }
}
