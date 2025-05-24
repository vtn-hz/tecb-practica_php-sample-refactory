import { get } from '../modules/http'



function domReady() {
    return new Promise(resolve => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve(); // El DOM ya está listo
        }
    });
}

function createActionCell ({ edit, remove }) {
    const td = document.createElement('td');

    const editBtn = document.createElement('button');

    editBtn.textContent = 'Editar';
    editBtn.className = 'w3-button w3-blue w3-small';
    editBtn.addEventListener('click', edit);

    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Borrar';
    deleteBtn.className = 'w3-button w3-red w3-small w3-margin-left';
    deleteBtn.addEventListener('click', remove);

    td.appendChild(editBtn);
    td.appendChild(deleteBtn);

    return td;
}

function createCell(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}

function createRow(fields, item, { edit, remove }) {
    const tr = document.createElement('tr');

    // Recorremos cada propiedad del objeto usando fields
    fields.forEach(field => {
        const td = createCell(item[field]);
        tr.appendChild(td);
    });

    // Agregamos la celda de acciones al final
    const actionCell = createActionCell({ edit, remove });
    tr.appendChild(actionCell);

    return tr;
}

async function render ( parent, fields, sourceUrl, actionHandlers) {
    const response = await get(sourceUrl);
    const items    = response.data;

    let htmlChildren = [];
    items.forEach(item => {
        htmlChildren =  [...htmlChildren, createRow(fields, item, actionHandlers)];
    }) ;

    parent.replaceChildren( htmlChildren );
} 

export async function createTbody ( parentSelector, { fields, sourceUrl, actionHandlers: { edit, remove } } ) {
    await domReady ();
    
    const parent  = document.querySelector( parentSelector );
    const refresh = async _ => render(parent, fields, sourceUrl, actionHandlers);

    refresh();

    return { refresh }
} 



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