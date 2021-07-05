<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Tags\HasTags;
use Spatie\Tags\Tag;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;


class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    protected $fillable = [
        'name', 'email', 'image', 'provider', 'provider_id', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    public function getAvatarAttribute($value)
    {
        return asset($value ?: '/images/default-avatar.jpeg');
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function timeline($afterId = 0)
    {
        return Quote::withLikes($afterId)
        ->withAnyTags(Tag::pluck('name')->toArray())
        ->get();
    }

    public function getCategory($tag)
    {
        return Quote::withAnyTags([$tag])
        ->with('tagsTranslated')
        ->take(50)
        ->withCount([
            'likes AS total_likes' => function ($query) {
                $query->select(DB::raw("SUM(liked) as totallikes"));
            },
        ])->get();
    }

    

    public function quotes()
    {
        return $this->hasMany(Quote::class)->latest();
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

}
