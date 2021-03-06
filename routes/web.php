<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\QuoteLikesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SpreadSheetController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

Route::get('/spreadsheet/empty', [SpreadSheetController::class, 'getEmptySpreadSheet']);
 
Route::get('/', [QuoteController::class, 'index']);

Route::get('/quotes/{id}', [QuoteController::class, 'get']);

Route::get('/quotes/tag/{category}/{id}', [QuoteController::class, 'category']);

Route::get('/tags/all', [QuoteController::class, 'allTags']);
Route::post('/tags/generate ', [QuoteController::class, 'generate']);

Route::post('/like', [QuoteController::class, 'fetchLike']);

Route::post('/quotes/{quote}/like', [QuoteLikesController::class, 'store']);
Route::delete('/quotes/{quote}/like', [QuoteLikesController::class, 'destroy']);
 
Route::post('/dislike', [QuoteController::class, 'fetchDislike']);
Route::post('/dislike/{id}', [QuoteController::class, 'handleDislike']);

Route::get('/user', [UserController::class, 'get']);

Route::get('/admin', [AdminController::class, 'index']);
Route::post('/admin/quotes', [AdminController::class, 'get']);
Route::put('/admin/update', [AdminController::class, 'update']);
Route::put('/admin/spreadsheet', [AdminController::class, 'update']);

Route::get('/login/{provider}', [SocialController::class, 'redirect']);
Route::get('/login/{provider}/callback', [SocialController::class, 'Callback']);



Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
