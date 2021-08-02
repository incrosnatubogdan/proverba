<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFeed extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'user_id', 'feed_name', 'feed'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function encode_arr($data) {
        return base64_encode(serialize($data));
    }
    
    public static function decode_arr($data) {
        return unserialize(base64_decode($data));
    }
}
