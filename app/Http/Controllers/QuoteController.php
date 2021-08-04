<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Quote;
use App\Models\User;

use Spatie\Tags\HasTags;
use Spatie\Tags\Tag;

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

    public function allTags() {
        return Tag::pluck('name')->toArray();
    }

    public function getCombos($array){
        $bits = count($array); //bits of binary number equal to number of words in quer
        $dec = 1;
        
        $binary = str_split(str_pad(decbin($dec), $bits, '0', STR_PAD_LEFT));
        // dd($bits);
        while($dec < pow(2, $bits)) {
            //Each 'word' is linked to a bit of the binary number.
            //Whenever the bit is '1' its added to the current term.
            $curterm = array();
            $i = 0;
            while($i < ($bits)){
                if($binary[$i] == 1) {
                    $curterm[] = $array[$i]." ";
                }
                $i++;
            }
            // dd($curterm);
            $terms[] = $curterm;
            //Count up by 1
            $dec++;
            $binary = str_split(str_pad(decbin($dec), $bits, '0', STR_PAD_LEFT));
        }

        return $terms;
    } 

    // The soul of the app function

    public function generate(Request $request) {
        $data = array();
        $ids = array();
        $tags = $request->tags;
        $allTags = Tag::pluck('name')->toArray();
        
        
        if(!array_diff($tags, $allTags)) {
            $allComb = $this->getCombos($tags);
            array_multisort(array_map('count', $allComb), SORT_DESC, $allComb);

            foreach ($allComb as $key => $comb) {
                if(count($data) < 50) {
                    $quotes = Quote::withLikes(0)->whereNotIn('id', $ids)->withAllTags($comb);
                    $currentIds = $quotes->pluck('id')->toArray();
                    $retrievedData = $quotes->get();

                    foreach ($currentIds as $id) {
                        array_push($ids, $id);
                    }

                    if(count($retrievedData)) {
                        foreach ($retrievedData as $record) {
                            array_push($data, $record);
                        }
                    }
                }
            }
        }

        return $data;
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
