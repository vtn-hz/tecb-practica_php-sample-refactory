import { createSubmitHandler } from  '../../handlers/form/submit.js'
import { createTbody } from '../../widgets/tbody.js'

import { getElements } from './provider/elements.js'
import { subjectUrl } from './provider/endpoint.js'

import { del } from '../http.js'

const elements = await getElements();

const tbody = createTbody(elements.subjectTableBody, {
    fields: ['code', 'name', 'semester_number'],
    sourceUrl: subjectUrl,
    actionHandlers: {
        edit: (item, event) => {
            elements.subjectCode.value = item.code;
            elements.subjectName.value = item.name;
            elements.subjectSemesterNumber.value = item.semester_number;
            elements.subjectId.value = item.id;
        },

        remove: async (item, event) => {
            if (!confirm("¿Seguro que querés borrar esta materia?")) return;

            try {
                const response = await del (subjectUrl, item.id);

                if (response.success) {
                    tbody.render();  
                } else {
                    alert(response.data.error);
                }
            } catch (err) {
                console.error(err);
            } 
        }
    }
});

createSubmitHandler(elements.subjectForm, subjectUrl, 
    {
        id: elements.subjectId,
        code: elements.subjectCode,
        name: elements.subjectName,
        semester_number: elements.subjectSemesterNumber
    }, {
        on: {
            success: (response) => {
                elements.subjectForm.reset();
                elements.subjectId.value = '';
                tbody.render();
            },
            
            fail: (response) => {
                alert( response.data.error );
            }
        }
    }
); 

tbody.render();
