<?php


namespace App\Repositories;

use Illuminate\Http\Request;

use Spatie\Tags\HasTags;
use Spatie\Tags\Tag;

// use App\Models\User;
use App\Models\Quote;


class AdminRepository
{
    use HasTags;

    public function search(){
        // dd(Tag::pluck('name')->toArray());
        return Quote::withLikes(0)->withAnyTags(Tag::pluck('name')->toArray());
    }
}
