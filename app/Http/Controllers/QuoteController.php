<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Quote;
use App\Models\User;


class QuoteController extends Controller
{
    public function index(User $user)
    {
        // $quotes = $user->timeline();
        return view('home');
    }

    public function get(User $user, $id)
    {
        $user = auth()->user() == null ? $user : auth()->user();
        $quotes = $user->timeline((int)$id);

        if(count($quotes) < 20) {
            return $user->timeline(0);
        }

        return $quotes;
    }

    public function category(User $user, $category, $id)
    {
        $user = auth()->user() == null ? $user : auth()->user();
        $quotes = $user->getCategory($category, (int)$id );

        return $quotes;
    }
 
    // public function fetchLike(Request $request)
    // {
    //     $blog = Blog::find($request->blog);
    //     return response()->json([
    //         'blog' => $blog,
    //     ]);
    // }
 
    // public function handleLike(Request $request)
    // {
    //     $blog = Blog::find($request->blog);
    //     $value = $blog->like;
    //     $blog->like = $value+1;
    //     $blog->save();
    //     return response()->json([
    //         'message' => 'Liked',
    //     ]);
    // }    
 
    // public function fetchDislike(Request $request)
    // {
    //     $blog = Blog::find($request->blog);
    //     return response()->json([
    //         'blog' => $blog,
    //     ]);
    // }
 
    // public function handleDislike(Request $request)
    // {
    //     $blog = Blog::find($request->blog);
    //     $value = $blog->dislike;
    //     $blog->dislike = $value+1;
    //     $blog->save();
    //     return response()->json([
    //         'message' => 'Disliked',
    //     ]);
    // }
}