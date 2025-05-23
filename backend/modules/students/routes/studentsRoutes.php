<?php

require_once("./modules/router/models/handlerFactory.php")
require_once("./modules/students/controllers/studentsController.php");

$handler = createHandler( $_SERVER['REQUEST_METHOD'] ) ;
$handler();

?>