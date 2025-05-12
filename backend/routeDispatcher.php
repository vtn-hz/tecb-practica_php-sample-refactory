<?php 

const BASE_URL = '/project-refactory/backend/';

const NOT_FOUND = './routes/error/notFound.php';

function getRoutes () : array
{
    return [
        'api/students' => './routes/studentsRoutes.php'
        // to do...
    ];
}

function  getParsedPath (string $url) {
    return str_replace(BASE_URL, '', $url);
}

function dispatchRoute (string $url) : void 
{
    $availableRoutes = getRoutes();
    $path = getParsedPath($url);

    require_once( $availableRoutes[$path] ?? NOT_FOUND );
}



?>