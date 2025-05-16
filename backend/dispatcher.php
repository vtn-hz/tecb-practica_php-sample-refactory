<?php 

require_once ('./modules/router/models/router.php');

const BASE_URL = '/project-refactory/backend';
const NOT_FOUND = './modules/router/error/notFound.php';


function dispatchRoute (string $url) : void 
{
    $uri = parse_url($url, PHP_URL_PATH);
    $uri = str_replace(BASE_URL, '', $uri);

    $availableRoutes = getRoutes();
 
    require_once( $availableRoutes[$uri] ?? NOT_FOUND );
}

?>