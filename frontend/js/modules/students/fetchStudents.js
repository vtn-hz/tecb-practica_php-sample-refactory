import { createTbody } from "../../widgets/tbody.js";

async function fetchStudents() {
    const API_URL = getEndpoint();
    const elements = await getElements();

    //try {
        const tbody = createTbody(elements.studentTableBody, {
            fields: ['fullname', 'email', 'age'],
            sourceUrl: API_URL,
            actionHandlers: {
                edit: event => {
                    console.log(event.target);
                    // change... i cant send id neither dataform
                },

                remove: event => {
                    console.log(event.target); 
                    // change... i cant send id neither dataform
                }
            }
        });

        tbody.render();
    //} catch (err) {
        //console.error("Error al obtener estudiantes:", err);
    //}
}

fetchStudents();