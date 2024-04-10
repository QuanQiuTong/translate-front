import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8080/trans',
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

interface TranslateData {
    content: string
}

export function translate(data: TranslateData) {
    request.post('/submitPassage', data).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
    return ''
}
