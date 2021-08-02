<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function get(User $user)
    {
        // if ($user) {
        //     return response()->json($user);
        // }

        return response()->json(auth()->user());
    }

    // Feeds are only generated for logged users
    // Non logged users receive only 50 quotes from their categories

    public function generateFeed(User $user)
    {
        if(auth()->user()) {

        }
    }

    // public function generateFeed(User $user)
    // {
    //     if(auth()->user()) {

    //     }
    // }
}
