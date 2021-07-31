<?php


namespace App\Repositories;


use Spatie\Tags\HasTags;
use Spatie\Tags\Tag;

use PhpOffice\PhpSpreadsheet\Cell\DataValidation;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class SpreadSheetRepository
{
    /**
     * Build empty spreadsheet and download it
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
     */
    public function buildEmptySpreadSheet(){
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $allTags = $this->geTags();
        $sheet->setCellValue('A1','Title');
        $sheet->setCellValue('B1','Description');
        $sheet->setCellValue("C1",'Tags');
        $sheet->setCellValue("D1",'Tags');
        $sheet->setCellValue("E1",'Tags');
        $sheet->setCellValue("F1",'Tags');
        $sheet->setCellValue("G1",'Tags');
        $cells = ["C", "D", "E", "F", "G"];
        for($i=2;$i<=101;$i++){
            foreach ($cells as $c) {
                $validation = $sheet->getCell("$c$i")->getDataValidation();
                $validation->setType(DataValidation::TYPE_LIST);
                $validation->setFormula1('"'.implode(',', $allTags).'"');
                $validation->setAllowBlank(true);
                $validation->setShowDropDown(true);
                $validation->setShowInputMessage(true);
                $validation->setPromptTitle('Tags');
                $validation->setPrompt('Must select one from the drop down options.');
                $validation->setShowErrorMessage(true);
                $validation->setErrorStyle(DataValidation::STYLE_STOP);
                $validation->setErrorTitle('Invalid option');
                $validation->setError('Select one from the drop down list.');
            }
        }
        $writer = new Xlsx($spreadsheet);
        $writer->save(storage_path('Proverba_quotes.xlsx'));

        return response()->download(storage_path('Proverba_quotes.xlsx'))->deleteFileAfterSend(true);
    }

    /**
     * Get distinct user locations
     *
     * @return mixed
     */
    private function geTags(){
        return Tag::pluck('name')->toArray();
    }
}
