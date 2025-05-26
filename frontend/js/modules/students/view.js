import { createSubmitHandler } from  '../../handlers/form/submit.js'
import { createTbody } from '../../widgets/tbody.js'

import { getElements } from './provider/elements.js'
import { studentsUrl } from './provider/endpoint.js'

import { del } from '../http.js'

const elements = await getElements();

const tbody = createTbody(elements.studentTableBody, {
    fields: ['fullname', 'email', 'age'],
    sourceUrl: studentsUrl,
    actionHandlers: {
        edit: (item, event) => {
            elements.fullnameInput.value = item.fullname;
            elements.emailInput.value = item.email;
            elements.ageInput.value = item.age;
            elements.studentIdInput.value = item.id;
        },

        remove: async (item, event) => {
            if (!confirm("¿Seguro que querés borrar este estudiante?")) return;

            try {
                const response = await del (studentsUrl, item.id);

                if (response.success) {
                    tbody.render();  
                } else {
                    alert("Error al borrar");
                }
            } catch (err) {
                console.error(err);
            } 
        }
    }
});

createSubmitHandler(elements.studentForm, studentsUrl, 
    {
        id:         elements.studentIdInput,
        fullname:   elements.fullnameInput,
        email:      elements.emailInput,
        age:        elements.ageInput
    }, {
    on: {
        success: (response) => {
            elements.studentForm.reset();
            elements.studentIdInput.value = '';
            tbody.render();
        },
        
        fail: (response) => {
            alert( response.data.error );
        }
    }
}); 

tbody.render();
