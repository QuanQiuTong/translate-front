import axios from 'axios'

const request = axios.create({
    baseURL: 'api/user',
    timeout: 2000,
    withCredentials: true,
})

interface Response {
    config: object,
    data: { code: number, message: string, data: any },
    headers: object,
    request: object,
    status: number,
    statusText: string
}

export const register = (username: string, password: string): Promise<Response> =>
    request.post('/register', { username, password }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })

export const login = (username: string, password: string): Promise<Response> =>
    request.post('/login', { username, password }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

// export function logout() {
//     request.get('/logout').then(res => {
//         return res.data
//     }).catch(err => {
//         console.log(err)
//     })
// }

export const getUserInfo = (): Promise<Response> =>
    request.get('/userInfo', { headers: { 'Authorization': localStorage.token } })


export const updateUserInfo = (id: number, username: string, nickname: string, email: string) =>
    request.put('/update', { id, username, nickname, email }, { headers: { 'Authorization': localStorage.token } })

export const updatePassword = (old_pwd, new_pwd, re_pwd) =>
    request.patch('/updatePwd', { old_pwd, new_pwd, re_pwd }, { headers: { 'Authorization': localStorage.token } })

export const updateAvatar = (data: FormData) =>
    request.patch('/updateAvatar', data)

export const removeStorage = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("sessionID");
    localStorage.removeItem("sourceLanguage");
    localStorage.removeItem("style");
    localStorage.removeItem("targetLanguage");
    localStorage.removeItem("user_id");
}