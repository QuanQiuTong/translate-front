import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8080/trans',
    timeout: 2000,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})
request.defaults.withCredentials = true;

request.interceptors.request.use(config => {
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

interface Response {
    config: object,
    data: { code: number, message: string, data: string },
    headers: object,
    request: object,
    status: number,
    statusText: string
}

export const translate = (data: TranslateData, token: string | null): Promise<Response> => {
    return request.post('/submitPassage', data, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });
}
