<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

trait Likable
{
    public function scopeWithLikes(Builder $query)
    {
        // $query->leftJoinSub(
        //     'select quote_id, user_id as users, sum(liked) likes, sum(!liked) dislikes from likes group by (quote_id, user_id)',
        //     'likes',
        //     'likes.quote_id',
        //     'quotes.id',
        // );
        // dd();
        // $query->leftJoin(
        //     'select quote_id, user_id, sum(liked) AS likes, sum(!liked) AS dislikes from likes GROUP BY quote_id',
        // );
        $query->with('likes');
        
    }

    public function isLikedBy(User $user)
    {
        return (bool) $user->likes
            ->where('quote_id', $this->id)
            ->where('liked', true)
            ->count();
    }

    public function isDislikedBy(User $user)
    {
        return (bool) $user->likes
            ->where('quote_id', $this->id)
            ->where('liked', false)
            ->count();
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function seens()
    {
        return $this->hasMany(Seen::class);
    }

    public function dislike($user = null)
    {
        return $this->like($user, false);
    }

    public function like($user = null, $liked = true)
    {
        // dd($user->id);
        $user = $user->id ?? auth()->id();

        if($user == null) {
            return response()->json('User is not logged in', 200);
        }

        $this->likes()->updateOrCreate(
            [
                'user_id' => $user,
            ],
            [
                'liked' => $liked,
            ]
        );

        return response()->json('Ok', 200);
    }
}
