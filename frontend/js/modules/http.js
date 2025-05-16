
async function get ( url ) {
    const response = await window.fetch(url);
    const jsonizedResponse = await response.json();
    
    return jsonizedResponse;
}

async function post ( url, body ) {
    const response = await window.fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    return response.ok;
}

async function put ( url, body ) {
    const response = await window.fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    return response.ok;
}

async function del ( url, id ) {
    const response = await window.fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
    });

    return response.ok;
}
