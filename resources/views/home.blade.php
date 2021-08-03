@extends('layouts.app')

@section('content')
<div class="">
    <Boot :is_auth="{{ json_encode(auth()->check()) }}" />
</div>
@endsection
