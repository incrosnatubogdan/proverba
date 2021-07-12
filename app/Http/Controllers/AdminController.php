<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateQuoteRequest;


use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Quote;


class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('admin');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function get($id = 0)
    {
        $user = new User;
        return $user->paginatedTimeline($id, 20);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function update(CreateQuoteRequest $request, Quote $quote)
    {
        $quote = Quote::updateOrCreate(['id' => $request->id], $request->toArray());
        $quote->syncTags($request->tags);
        return $quote;
    }


}
