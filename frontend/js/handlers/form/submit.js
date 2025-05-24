import { post, put } from '../../modules/http.js'

function getMethodHandler (data) {
    if (!data.id) {
        return post;
    }

    return put;
}

function parseData (dataWatcher) {
    const data = {};

    for (const key in dataWatcher) {
        const inputElement = dataWatcher[key];
        data[key] = inputElement.value;
    }

    if (!data.id) {
        delete data.id;
    }

    return data;
}

export function createSubmitHandler ( formElement, actionUrl, dataWatcher, { on: { success, fail } }) {
    formElement.addEventListener('submit', async event => {
        event.preventDefault();

        const data = parseData(dataWatcher);
        const method = getMethodHandler(data);
        

        try {
            const response = await method(actionUrl, data);
            const onCallback = response.success ? success : fail; 
            onCallback( response );

        } catch(err) {
            console.log(err);
        }
    });
}