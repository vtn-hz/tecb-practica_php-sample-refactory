
export async function get ( url ) {
    const response = await window.fetch(url);
    const data = await response.json();
    
    return { 
        success: response.ok, 
        data: data
    };
}

export async function post ( url, body ) {
    const response = await window.fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    return { 
        success: response.ok, 
        data: data
    };
}

export async function put ( url, body ) {
    const response = await window.fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    return { 
        success: response.ok, 
        data: data 
    };
}

export async function del ( url, id ) {
    const response = await window.fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
    });
    
    const data = await response.json();

    return { 
        success: response.ok, 
        data: data 
    };
}