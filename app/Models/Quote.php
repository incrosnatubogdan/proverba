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

    protected $appends = ['emphasys_description'];

    public function getEmphasysDescriptionAttribute()
    {
        $textArr = explode(" ", $this->description);

        // sets an emphasys on the last word in the description
        $textArr[count($textArr) - 1] = "<p class='emphasys'>". array_pop($textArr) ."</>";

        return implode(" ", $textArr);
    }
 
    public function getRouteKeyName()
    {
        return 'post_slug';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}