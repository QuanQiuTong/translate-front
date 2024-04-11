import axios from 'axios'

export const request = axios.create({
    baseURL: 'http://localhost:8080/trans',
    timeout: 30000,
})

request.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) { config.headers.Authorization = token }
        return config
    }, error => {
        return Promise.reject(error)
    })

interface Response {
    config: object,
    data: { code: number, message: string, data: string },
    headers: object,
    request: object,
    status: number,
    statusText: string
}

export const translate = async (data: string): Promise<Response> => {
    return request.post(
        '/submitPassage',
        { content: data }
    );
}
