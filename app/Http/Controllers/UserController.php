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
}
