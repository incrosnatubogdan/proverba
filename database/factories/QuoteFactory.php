<?php

namespace Database\Factories;

use App\Models\Quote;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class QuoteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Quote::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $tags = array("Neo", "Morpheus", "Trinity", "Cypher", "Tank", 'customer','fine','seasonal','abortion','reverse','arrow','piano','ditch',
        'philosophy','looting','distort','laundry','participate','symptom','temple','stuff','mother','sequence','underline','cabin','reflection','corn','wave');
        shuffle($tags);
        $rand_tags = array_slice($tags, 0, 5);
        return [
            'post_title' => $this->faker->name(),
            'description' => $this->faker->text($maxNbChars = 100),
            'post_slug' => $this->faker->name(),
            'tags' => $rand_tags,
        ];
    }
}
