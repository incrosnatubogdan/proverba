<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Tags\HasTags;

class Quote extends Model
{
    use HasFactory, Likable, HasTags;
    protected $table = 'quotes';

    protected $primaryKey = 'id';

    protected $fillable = [
        'post_title',
        'description'
    ];
 
    public function getRouteKeyName()
    {
        return 'post_slug';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}