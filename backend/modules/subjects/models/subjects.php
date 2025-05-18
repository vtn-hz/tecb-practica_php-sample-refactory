<?php
function getAllSubjects($conn) {
    $sql = "SELECT * FROM subjects";
    return $conn->query($sql);
}

function getSubjectById($conn, $id) {
    $sql = "SELECT * FROM subjects WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    return $stmt->get_result();
}

function createSubjects($conn, $code, $name, $semesterNumber) {
    $sql = "INSERT INTO subjects (code, name, semester_number) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $code, $name, $semesterNumber);
    return $stmt->execute();
}

function updateSubject($conn, $id, $code, $name, $semesterNumber) {
    $sql = "UPDATE subjects SET code = ?, name = ?, semester_number = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssii", $code, $name, $semesterNumber, $id);
    return $stmt->execute();
}

function deleteSubject($conn, $id) {
    $sql = "DELETE FROM subjects WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    return $stmt->execute();
}
?>