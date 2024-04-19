import axios from 'axios'

export const request = axios.create({
    baseURL: 'http://localhost:8080/trans',
    timeout: 60000,
})

request.interceptors.request.use(
    config => {
        config.headers.Authorization = localStorage.getItem('token')
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
        {
            sessionId: parseInt(localStorage.sessionID),
            content: data
        }
    );
}
