<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;


class QuoteLikesController extends Controller
{
    public function store(Request $request, $id)
    {
        $quote = Quote::findOrFail($id);
        // dd(current_user()); 
        $quote = $quote->like(current_user(), true);

        return $quote;
    }

    public function destroy(Request $request, $id)
    {
        $quote = Quote::findOrFail($id);
        // dd($quote); 
        $quote = $quote->dislike(current_user());

        return $quote;
    }
}
