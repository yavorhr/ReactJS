const baseUrl = 'http://localhost:3030'

export const getAll = () => {
    return fetch(`${baseUrl}/data/games`)
    .then(response => response.json());
}