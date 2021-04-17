<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Spatie\Tags\Tag;

trait Likable
{
    public function scopeWithLikes(Builder $query, $id)
    {
        $alreadyLiked = $this->likedbyUser(auth()->id());

        // dd(Tag::findFromString('second tag'));

        $query->where('id', '>', $id)

        // Used for tagging
        // ->withAnyTags(['second tag'])
        
        ->whereNotIn('id', $alreadyLiked)
        ->take(50)
        ->with('tagsTranslated')
        // ->with(array('tagsTranslated' => function($query) {
        //     $query->select('id','name');
        // }))
        ->withCount([
            'likes AS total_likes' => function ($query) {
                $query->select(DB::raw("SUM(liked) as totallikes"));
            },
        ]);
    }

    // public function tags()
    // {
    //     return $this->hasMany(Tag::class);
    // }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function seens()
    {
        return $this->hasMany(Seen::class);
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function likedbyUser($user = null)
    {
        return Like::where('user_id', $user)->pluck('quote_id');
    }

    public function dislike($user = null)
    {
        return $this->like($user, false);
    }

    public function like($user = null, $liked)
    {
        $user = $user->id ?? auth()->id();
        $likeNo = $liked ? 1 : -1;

        if($user == null) {
            return response()->json('User is not logged in', 200);
        }

        $this->likes()->updateOrCreate([
                'user_id' => $user,
            ],[
                'liked' => $likeNo,
        ]);

        return response()->json('Ok', 200);
    }
}
