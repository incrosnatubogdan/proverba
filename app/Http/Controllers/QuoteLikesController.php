<?php

namespace App\Http\Controllers;

use App\Models\Quote;

class QuoteLikesController extends Controller
{
    public function store(Quote $quote)
    {
        $quote = $quote->like(current_user());

        return $quote;
    }

    public function destroy(Quote $quote)
    {
        $quote->dislike(current_user());

        return back();
    }
}
