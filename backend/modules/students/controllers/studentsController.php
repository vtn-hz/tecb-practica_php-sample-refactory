<?php
require_once("./modules/students/models/students.php");
require_once("./modules/student_subjects/models/student_subjects.php");

function handleGet($conn) {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['id'])) {
        $result = getStudentById($conn, $input['id']);
        echo json_encode($result->fetch_assoc());
    } else {
        $result = getAllStudents($conn);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    }
}

function handlePost($conn) {
    $input = json_decode(file_get_contents("php://input"), true);
    if (createStudent($conn, $input['fullname'], $input['email'], $input['age'])) {
        echo json_encode(["message" => "Estudiante agregado correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo agregar"]);
    }
}

function handlePut($conn) {
    $input = json_decode(file_get_contents("php://input"), true);
    if (updateStudent($conn, $input['id'], $input['fullname'], $input['email'], $input['age'])) {
        echo json_encode(["message" => "Actualizado correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo actualizar"]);
    }
}


function handleDelete($conn) {
    $input = json_decode(file_get_contents("php://input"), true);

    if (hasSubjectsByStudentId($conn, $input['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "No se puede eliminar el estudiante porque está asociado a una o más materias"]);
        return;
    }

    if (deleteStudent($conn, $input['id'])) {
        echo json_encode(["message" => "Eliminado correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo eliminar"]);
    }
}
?>
