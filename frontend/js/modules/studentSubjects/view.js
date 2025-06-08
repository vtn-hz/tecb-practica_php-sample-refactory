import { createSubmitHandler } from '../../handlers/form/submit.js';
import { createTbody } from '../../widgets/tbody.js';
import { getElements } from './provider/elements.js';

import { 
    studentSubjectsUrl, 
    studentsUrl, 
    subjectsUrl 
} from './provider/endpoint.js';

import { del } from '../http.js';
import { create as createDropdown } from '../../widgets/dropdown.js';

const elements = await getElements();

// Creamos y poblamos los dropdowns:
const studentsDropdown = await createDropdown(
    studentsUrl, 
    { selectName: 'student_id' },
    { valueAttr: 'id', labelAttr: 'fullname' }
);
elements.studentDropdownContainer.appendChild(studentsDropdown);

const subjectsDropdown = await createDropdown(
    subjectsUrl, 
    { selectName: 'subject_id' },
    { valueAttr: 'id', labelAttr: 'name' }
);
elements.subjectDropdownContainer.appendChild(subjectsDropdown);

// Creamos el tbody para listar las relaciones:
const tbody = createTbody(elements.studentSubjectTableBody, {
    fields: ['student_name', 'subject_name', 'is_aprobbed'],
    sourceUrl: studentSubjectsUrl,
    actionHandlers: {
        edit: (item, event) => {
            elements.studentSubjectIdInput.value = item.id;
            studentsDropdown.value = item.student_id;
            subjectsDropdown.value = item.subject_id;
            elements.isAprobbedInput.checked = Boolean(item.is_aprobbed);
        },
        remove: async (item, event) => {
            if (!confirm("¿Seguro que querés borrar esta relación?")) return;
            try {
                const response = await del(studentSubjectsUrl, { 
                    student_id: item.student_id, 
                    subject_id: item.subject_id 
                });
                if (response.success) {
                    tbody.render();
                } else {
                    alert("Error al borrar la relación");
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
});

createSubmitHandler(
    elements.studentSubjectForm,
    studentSubjectsUrl, 
    {
        id:          elements.studentSubjectIdInput,
        student_id:  studentsDropdown,
        subject_id:  subjectsDropdown,  
        is_aprobbed: elements.isAprobbedInput
    }, 
    {
        on: {
            success: () => {
                elements.studentSubjectForm.reset();
                elements.studentSubjectIdInput.value = '';
                tbody.render();
            },
            fail: (response) => {
                alert(response.data.error);
            }
        }
    }
);

tbody.render();
