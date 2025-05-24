import { create }

async function fetchStudents() {
    const API_URL = getEndpoint();
    const elements = await getElements();

    try {
        const response = await get(API_URL);
        const students = response.data;
        //Limpiar tabla de forma segura.
        elements.studentTableBody.replaceChildren();
        //acá innerHTML es seguro a XSS porque no hay entrada de usuario
        //igual no lo uso.
        //studentTableBody.innerHTML = "";

        students.forEach(student => {
            const tr = document.createElement('tr');

            const tdName = document.createElement('td');
            tdName.textContent = student.fullname;

            const tdEmail = document.createElement('td');
            tdEmail.textContent = student.email;

            const tdAge = document.createElement('td');
            tdAge.textContent = student.age;

            const tdActions = document.createElement('td');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.classList.add('w3-button', 'w3-blue', 'w3-small', 'w3-margin-right');
            editBtn.onclick = () => {
                elements.fullnameInput.value = student.fullname;
                elements.emailInput.value = student.email;
                elements.ageInput.value = student.age;
                elements.studentIdInput.value = student.id;
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Borrar';
            deleteBtn.classList.add('w3-button', 'w3-red', 'w3-small');
            deleteBtn.onclick = () => deleteStudent(student.id);

            tdActions.appendChild(editBtn);
            tdActions.appendChild(deleteBtn);

            tr.appendChild(tdName);
            tr.appendChild(tdEmail);
            tr.appendChild(tdAge);
            tr.appendChild(tdActions);

            elements.studentTableBody.appendChild(tr);
        });
    } catch (err) {
        console.error("Error al obtener estudiantes:", err);
    }
}

fetchStudents();