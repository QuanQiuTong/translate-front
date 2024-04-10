import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8080/user',
    timeout: 2000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

request.interceptors.request.use(config => {
    if (config.method === 'post') {
        config.data = JSON.stringify(config.data)
    }
    return config
}, error => {
    return Promise.reject(error)
})

request.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

interface UserData {
    username: string
    password: string
}

export function register(data: UserData) {
    request.post('/register', data).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export function login(data: UserData) {
    request.post('/login', data).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

// export function logout() {
//     request.get('/logout').then(res => {
//         return res.data
//     }).catch(err => {
//         console.log(err)
//     })
// }

export function getUserInfo() {
    request.get('/userInfo').then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export function updateUserInfo(data: UserData) {
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
