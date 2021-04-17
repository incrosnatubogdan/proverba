<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

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
            // ->where('id', '>', $afterId)
            // ->take(20)
            ->get();
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
