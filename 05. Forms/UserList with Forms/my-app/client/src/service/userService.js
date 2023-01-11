
let baseUrl = 'http://localhost:3005/api/users';

export const getAll = async () => {
    let response = await fetch(baseUrl);
    let result = await response.json();

    return result.users;
}

export const getOne = async (id) => {
    let response = await fetch(`${baseUrl}/${id}`);
    let result = await response.json();
    return result.user;
}

export const create = async (userData) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    })

    if (response.ok) {
        const result = await response.json();
        return result.user;
    } else {
        throw { message: 'Unable to create user' }
    }
}

export const edit = async (id, userData) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    })

    if (response.ok) {
        const result = await response.json();
        return result.user;
    } else {
        throw { message: 'Unable to create user' }
    }
}

export const deleteUser = async (id) => {
    let response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

