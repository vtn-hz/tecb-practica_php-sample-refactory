<?php
require_once("./config/databaseConfig.php");
require_once("./modules/router/models/handlerFactory.php");
require_once("./modules/studentSubjects/controllers/studentSubjectsController.php");

$handler = createHandler( $_SERVER['REQUEST_METHOD'] );
$handler($conn);

?>