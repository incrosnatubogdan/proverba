<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;


class QuoteLikesController extends Controller
{
    public function store(Request $request, $id)
    {
        $quote = Quote::findOrFail($id);
        // dd($quote); 
        $quote = $quote->like(current_user());

        return $quote;
    }

    public function destroy(Quote $quote)
    {
        $quote->dislike(current_user());

        return back();
    }
}
