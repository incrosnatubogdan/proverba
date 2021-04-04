@extends('layout.app')
 
@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Quotes</div>
 
                <div class="card-body">
                    <ul>
                        @foreach ($quotes as $data)
                        <quote :quote="{{ $data }}"> </quote>
                        @endforeach
                    </ul>
                </div>
                 
            </div>
        </div>
    </div>
</div>

@endsection