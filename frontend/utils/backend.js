import axios from 'axios'

export async function getUser(id) {
    const { data } = await axios.get(`/api/users/${id}`)
    return data
}

export async function postUser(user) {
    const { data } = await axios.post('/api/users', user)
    return data
}

export async function editUser(id, user) {
    const { data } = await axios.put(`/api/users/${id}`, user)
    return data
}

export async function deleteUser(id) {
    const { data } = await axios.delete(`/api/users/${id}`)
    return data    
}