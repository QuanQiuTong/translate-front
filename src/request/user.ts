import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8080/user',
    timeout: 2000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
interface User {
    username: string
    password: string
}

interface Response {
    config: object,
    data: { code: number, message: string, data: any },
    headers: object,
    request: object,
    status: number,
    statusText: string
}

export const register = (data: User): Promise<Response> =>
    request.post('/register', data);

export const login = (data: User): Promise<Response> =>
    request.post('/login', data);

// export function logout() {
//     request.get('/logout').then(res => {
//         return res.data
//     }).catch(err => {
//         console.log(err)
//     })
// }

export async function getUserInfo(): Promise<Response> {
    try {
        const res = await request.get('/userInfo');
        return res.data;
    } catch (err) {
        console.log(err);
        throw err; // Rethrow the error to be handled by the caller
    }
}

export function updateUserInfo(data: User) {
    request.post('/update', data).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export function updateAvatar(data: FormData) {
    request.patch('/updateAvatar', data).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}
