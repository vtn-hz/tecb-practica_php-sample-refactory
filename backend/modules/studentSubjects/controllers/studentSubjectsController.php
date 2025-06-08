<?php
require_once("./modules/studentSubjects/models/studentSubjects.php");

function handleGet($conn) {
    $input = json_decode(file_get_contents("php://input"), true);

    // Si viene un ID, filtramos por ese estudiante
    if (isset($input['id'])) {
        $result = getStudentSubjectsByStudentId($conn, $input['id']);
    } else {
        $result = getAllStudentSubjects($conn);
    }

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}

function handlePost($conn) {
    $input = json_decode(file_get_contents("php://input"), true);
    $status = false;

    $errorMsg = "No se pudo agregar la relación";

    try {
        $status = createStudentSubject(
            $conn, 
            $input['student_id'], 
            $input['subject_id'], 
            $input['is_aprobbed'] ?? 0
        );
    } catch (mysqli_sql_exception $e) {
        $status = false;

        
        if ($e->getCode() === 1062) {
            $errorMsg = "El alumno ya está asociado a esa materia";
            http_response_code(409);
        }else 
            http_response_code(500);
    }

    if ($status) 
        echo json_encode(["message" => "Relación agregada correctamente"]);
    else 
        echo json_encode(["error" => $errorMsg]);
}


function handlePut($conn) {
    $input = json_decode(file_get_contents("php://input"), true);
    if (updateStudentSubject($conn, $input['id'], $input['student_id'], $input['subject_id'], $input['is_aprobbed'])) {
        echo json_encode(["message" => "Relación actualizada correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo actualizar relación"]);
    }
}

function handleDelete($conn) {
    $input = json_decode(file_get_contents("php://input"), true);
    if (deleteStudentSubject($conn, $input['id'])) {
        echo json_encode(["message" => "Relación eliminada correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo eliminar relación"]);
    }
}
?>
