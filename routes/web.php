<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\QuoteLikesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SocialController;





/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/
 
Route::get('/', [QuoteController::class, 'index']);

Route::get('/quotes/{id}', [QuoteController::class, 'get']);
 
Route::post('/like', [QuoteController::class, 'fetchLike']);

Route::post('/quotes/{quote}/like', [QuoteLikesController::class, 'store']);
Route::delete('/quotes/{quote}/like', [QuoteLikesController::class, 'destroy']);
 
Route::post('/dislike', [QuoteController::class, 'fetchDislike']);
Route::post('/dislike/{id}', [QuoteController::class, 'handleDislike']);

Route::get('/user', [UserController::class, 'get']);

Route::get('/login/{provider}', [SocialController::class, 'redirect']);
Route::get('/login/{provider}/callback', [SocialController::class, 'Callback']);
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
