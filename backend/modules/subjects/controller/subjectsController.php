<?php
require_once("./modules/subjects/models/subjects.php");

function handleGet($conn) {
    if (isset($_GET['id'])) {
        $result = getSubjectById($conn, $input['id']);
        echo json_encode($result->fetch_assoc());
    } else {
        $result = getAllSubjects($conn);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    }
}

function handlePost($conn) {
    $input = json_decode(file_get_contents("php://input"), true);
    $status = false;
    $errorMsg = "No se pudo agregar";

    try{
        $status = createSubject($conn, $input['code'], $input['name'], $input['semester_number']);
    }catch(mysqli_sql_exception $e) {
        $status = false;    

        if ($e->getCode() === 1062) {
            $errorMsg = "El código {$input['code']} ya se encuentra utilizado";
        }   
    }

    if ($status) {
        echo json_encode(["message" => "Materia agregada correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => $errorMsg]);
    }
}

function handlePut($conn) {
    $input = json_decode(file_get_contents("php://input"), true);
    $status = false;
    $errorMsg = "No se pudo actualizar";

    try{
        $status = updateSubject($conn, $input['id'], $input['code'], $input['name'], $input['semester_number']);
    }catch(mysqli_sql_exception $e) {
        $status = false;    

        if ($e->getCode() === 1062) {
            $errorMsg = "El código {$input['code']} ya se encuentra utilizado";
        }   
    }


    if ($status) {
        echo json_encode(["message" => "Actualizada correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => $errorMsg]);
    }
}

function handleDelete($conn) {
    $input = json_decode(file_get_contents("php://input"), true);
    if (deleteSubject($conn, $input['id'])) {
        echo json_encode(["message" => "Eliminada correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo eliminar"]);
    }
}
?>
