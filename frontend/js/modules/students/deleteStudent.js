async function deleteStudent(id) {
    const API_URL = getEndpoint();

    if (!confirm("¿Seguro que querés borrar este estudiante?")) return;

    try {
        const success = await del (API_URL, id);

        if (success) {
            await fetchStudents();
        } else {
            alert("Error al borrar");
        }
    } catch (err) {
        console.error(err);
    }
}