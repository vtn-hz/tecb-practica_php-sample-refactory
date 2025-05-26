<?php
require_once("./config/databaseConfig.php");
require_once("./modules/router/models/handlerFactory.php");
require_once("./modules/students/controllers/studentsController.php");

$handler = createHandler( $_SERVER['REQUEST_METHOD'], [
    'POST' => function ($conn) {
        $input = json_decode(file_get_contents("php://input"), true);
        
        if ($input['age'] <= 16) {
            http_response_code(400);
            echo json_encode(["error" => "Los estudiantes deben ser mayores a 16 años"]);
            exit;
        }

        handlePost($conn);
    }
]) ;

$handler($conn);

?>