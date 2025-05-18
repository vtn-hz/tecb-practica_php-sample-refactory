const getElements = async () => {
    await new Promise(resolve => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    }); // wait until dom loaded

    return {
        studentForm: document.getElementById('studentForm'),
        studentTableBody: document.getElementById('studentTableBody'),
        fullnameInput: document.getElementById('fullname'),
        emailInput: document.getElementById('email'),
        ageInput: document.getElementById('age'),
        studentIdInput: document.getElementById('studentId')
    };
};
