<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Quote;
use App\Models\UserFeed;

class GenerateDefaultFeed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api:generate-default-feed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generates and encrypts the default field';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(Quote $quote)
    {
        parent::__construct();
        $this->quote = $quote;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->quote->chunk(100, function ($quotes, $index) {
            $ids = $quotes->pluck('id')->toArray();
            $encryptedArr = UserFeed::encode_arr($ids);
            UserFeed::create([
                'feed_name'          => 'default_' . $index,
                'feed'         => $encryptedArr,
            ]);
        });
    }
}
