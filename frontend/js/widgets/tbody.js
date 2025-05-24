import { get } from '../modules/http.js'

function createActionCell (item, { edit, remove }) {
    const td = document.createElement('td');

    const editBtn = document.createElement('button');

    editBtn.textContent = 'Editar';
    editBtn.className = 'w3-button w3-blue w3-small';
    editBtn.addEventListener('click', event => edit(item, event) );

    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Borrar';
    deleteBtn.className = 'w3-button w3-red w3-small w3-margin-left';
    deleteBtn.addEventListener('click', event => remove(item, event) );

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

    fields.forEach(field => {
        const td = createCell(item[field]);
        tr.appendChild(td);
    });

    const actionCell = createActionCell(item, { edit, remove });
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

    parent.replaceChildren(...htmlChildren );
} 

export function createTbody ( parent, { fields, sourceUrl, actionHandlers: { edit, remove } } ) {
    const doRender = async _ => render(parent, fields, sourceUrl, { edit, remove });
    return { render: doRender };
} 
