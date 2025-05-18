<?php
require_once("./modules/subjects/models/subjects.php");

function handleGet($conn) {
    if (isset($_GET['id'])) {
        $result = getSubjectById($conn, $_GET['id']);
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
    if (createSubject($conn, $input['code'], $input['name'], $input['semester_number'])) {
        echo json_encode(["message" => "Materia agregada correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo agregar"]);
    }
}

function handlePut($conn) {
    $input = json_decode(file_get_contents("php://input"), true);
    if (updateSubject($conn, $input['id'], $input['code'], $input['name'], $input['semester_number'])) {
        echo json_encode(["message" => "Actualizada correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo actualizar"]);
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