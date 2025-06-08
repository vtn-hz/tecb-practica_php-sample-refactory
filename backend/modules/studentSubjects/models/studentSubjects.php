<?php
function getStudentSubjectsByStudentId($conn, $studentId) {
    $sql = "SELECT ss.id, ss.student_id, ss.subject_id, ss.is_aprobbed,
                   s.fullname AS student_name,
                   sub.code AS subject_code, sub.name AS subject_name, sub.semester_number
            FROM student_subjects ss
            JOIN students s ON ss.student_id = s.id
            JOIN subjects sub ON ss.subject_id = sub.id
            WHERE ss.student_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $studentId);
    $stmt->execute();
    return $stmt->get_result();
}

function getAllStudentSubjects($conn) {
    $sql = "SELECT ss.id, ss.student_id, ss.subject_id, ss.is_aprobbed,
                   s.fullname AS student_name,
                   sub.code AS subject_code, sub.name AS subject_name, sub.semester_number
            FROM student_subjects ss
            JOIN students s ON ss.student_id = s.id
            JOIN subjects sub ON ss.subject_id = sub.id";
    return $conn->query($sql);
}

function createStudentSubject($conn, $studentId, $subjectId, $isAprobbed = 0) {
    $sql = "INSERT INTO student_subjects (student_id, subject_id, is_aprobbed)
            VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $studentId, $subjectId, $isAprobbed);
    return $stmt->execute();
}

function updateStudentSubject($conn, $id, $studentId, $subjectId, $isAprobbed) {
    $sql = "UPDATE student_subjects
            SET student_id = ?, subject_id = ?, is_aprobbed = ?
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiii", $studentId, $subjectId, $isAprobbed, $id);
    return $stmt->execute();
}

function deleteStudentSubject($conn, $id) {
    $sql = "DELETE FROM student_subjects
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    return $stmt->execute();
}

function hasSubjectsByStudentId($conn, $studentId) {
    $sql = "SELECT COUNT(*) as count FROM student_subjects WHERE student_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $studentId);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    return $result['count'] > 0;
}

function hasStudentsBySubjectId($conn, $subjectId) {
    $sql = "SELECT COUNT(*) as count FROM student_subjects WHERE subject_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $subjectId);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    return $result['count'] > 0;
}

?>
