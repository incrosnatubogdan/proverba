<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateQuoteRequest;
use App\Http\Requests\BulkCreateQuoteRequest;



use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Quote;

use App\Repositories\AdminRepository;


class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
   /**
     * @var \App\Repositories\AdminRepository
     */
    private $adminRepository;


    /**
     * UserController constructor.
     *
     * @param \App\Repositories\AdminRepository $adminRepository
     */
    public function __construct(AdminRepository $adminRepository)
    {
        $this->adminRepository = $adminRepository;
    }

    public function index()
    {
        return view('admin');
    }

    public function get(Request $request)
    {
        // $user = new User;
        // return $user->paginatedTimeline($id, 20);
        // return AdminRepository
        return response()->json($this->adminRepository->search($request)->paginate(isset($request->rowsPerPage) ? $request->rowsPerPage : 20));
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function update(CreateQuoteRequest $request, Quote $quote)
    {
        $quote = Quote::updateOrCreate(['id' => $request->id], $request->toArray());
        $quote->syncTags($request->tags);
        return $quote;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function spreadsheet(BulkCreateQuoteRequest $request, Quote $quote)
    {
        foreach ($request as $key => $csvRow) {
            $quote = Quote::updateOrCreate(['post_title' => $csvRow->post_title], $csvRow->toArray());
            $quote->syncTags($csvRow->tags);
        }
    }


}
