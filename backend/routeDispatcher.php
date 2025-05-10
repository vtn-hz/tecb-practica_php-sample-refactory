<?php 

const NOT_FOUND = './routes/error/notFound.php';

$availableRoutes = [
    '' => ''
    // to do...
];

function dispatchRoute (string $path) : void 
{
    $route = $availableRoutes[$path] ?? NOT_FOUND;  
    require_once( $route );
}

?>