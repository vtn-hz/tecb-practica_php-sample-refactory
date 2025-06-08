// frontend/js/modules/studentSubjects/provider/elements.js
export const getElements = async () => {
    await new Promise(resolve => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    });

    return {
        studentSubjectForm:        document.getElementById('studentSubjectForm'),
        studentSubjectTableBody:   document.getElementById('studentSubjectTableBody'),
        studentDropdownContainer:  document.getElementById('studentDropdownContainer'),
        subjectDropdownContainer:  document.getElementById('subjectDropdownContainer'),
        studentSubjectIdInput:     document.getElementById('studentSubjectId'),
        isAprobbedInput:           document.getElementById('is_aprobbed')
    };
};