export const getElements = async () => {
    await new Promise(resolve => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    }); // wait until dom loaded

    return {
        subjectTableBody: document.getElementById('subjectTableBody'),

        subjectForm: document.getElementById('subjectForm'),

        subjectCode: document.getElementById('code'),
        subjectName: document.getElementById('name'),
        subjectSemesterNumber: document.getElementById('semester_number'),

        subjectId:   document.getElementById('subjectId')
    };
};
