import axios from 'axios'
export const register = newClient => {
    return axios.post('http://localhost:4000/client/register', {
            name: newClient.name,
            email: newClient.email,
            password: newClient.password
        })
        .then(res => {
            console.log('Registered')
        })
}
export const login = client => {
    return axios.post('http://localhost:4000/client/login', {
            email: client.email,
            password: client.password
        })
        .then(res => {
            localStorage.setItem('clienttoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}