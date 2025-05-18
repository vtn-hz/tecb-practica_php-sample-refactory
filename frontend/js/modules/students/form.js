(async function () {
    const API_URL = getEndpoint();
    const elements = await getElements();

    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            fullname: elements.fullnameInput.value,
            email: elements.emailInput.value,
            age: elements.ageInput.value,
        };

        const id = elements.studentIdInput.value;
        if (id) formData.id = id;

        try {
            const method = formData.id ? put : post; 
            const success = await method(API_URL, formData); 
            
            if (success) {
                elements.studentForm.reset();
                elements.studentIdInput.value = '';
                await fetchStudents();
            } else {
                alert("Error al guardar");
            }
        } catch (err) {
            console.error(err);
        }
    });

})();
