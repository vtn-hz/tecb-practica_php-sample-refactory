import { get } from '../modules/http.js'


function createOption ( value, label ) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;

    return option;
}

function createOptionsContainer ( name ) {
    const optionsContainer = document.createElement('select');
    optionsContainer.name = name;
    
    return optionsContainer;
}   

async function populateOptions ( url, container, { valueAttr, labelAttr }) {
    const result = await get (url); 

    if (result.success) {
        const data = result.data;
        data.forEach(item => {
            container.appendChild( createOption(item[valueAttr], item[labelAttr]));
        });
    }
} 

export async function create ( url, { selectName }, {valueAttr, labelAttr}) {
    const optionsContainer = createOptionsContainer( selectName );
    populateOptions(url, optionsContainer, {valueAttr, labelAttr});
    
    return optionsContainer;
}
