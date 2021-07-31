<?php


namespace App\Http\Controllers;

use App\Repositories\SpreadSheetRepository;

class SpreadSheetController extends Controller
{
    /**
     * @var SpreadSheetRepository
     */
    private $spreadSheetRepository;

    /**
     * SpreadSheetController constructor.
     */
    public function __construct(SpreadSheetRepository $spreadSheetRepository)
    {
        $this->spreadSheetRepository = $spreadSheetRepository;
    }

    /**
     * Get a new empty spreadsheet
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
     */
    public function getEmptySpreadSheet(){
        return $this->spreadSheetRepository->buildEmptySpreadSheet();
    }
}
