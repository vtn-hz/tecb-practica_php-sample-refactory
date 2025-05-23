<?php

require_once("./modules/router/models/handlerFactory.php")
require_once("./modules/subjects/controller/subjectsController.php");

$handler = createHandler( $_SERVER['REQUEST_METHOD'] ) ;
$handler();
?>