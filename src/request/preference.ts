import axios, { type AxiosInstance } from 'axios'

class Preference {
    req: AxiosInstance
    constructor(url: string) {
        this.req = axios.create({
            baseURL: url,
            timeout: 2000
        })
        this.req.interceptors.request.use(
            config => {
                config.headers.Authorization = localStorage.token
                return config
            }, error => {
                return Promise.reject(error)
            }
        )
    }

    async setStyle(style: string) {
        let res = await this.req.post('/setStyle',
            {
                sessionId: localStorage.sessionID,
                style: style
            })
        console.log(res.data)
        return res.data
    }

    async getStyle() {
        let res = await this.req.post('/getStyle', { sessionId: localStorage.sessionID })
        console.log(res.data)
        return res.data.data
    }

    async setLanguage(source: string, target: string) {
        let res = await this.req.post('/setLanguage',
            {
                sessionId: localStorage.sessionID,
                source_language: source,
                target_language: target
            })
        console.log(res.data)
        return res.data
    }

    async getLanguage() {
        let res = await this.req.post('/getLanguage', { sessionId: localStorage.sessionID })
        console.log(res.data)
        return res.data.data
    }

    async setReplaceWords(from: string, to: string) {
        let res = await this.req.post('/setReplace',
            {
                session_id: localStorage.sessionID,
                replace_from: from,
                replace_to: to
            })
        console.log(res.data)
        return res.data
    }

    async getReplaceWords() {
        let res = await this.req.post('/getReplace', { session_id: localStorage.sessionID })
        console.log(res.data)
        return res.data.data
    }

    async deleteRePlaceWords(from: string) {
        let res = await this.req.delete('/deleteReplace',
            {
                data: {
                    session_id: localStorage.sessionID,
                    replace_from: from
                }
            })
        console.log(res.data)
        return res.data
    }
}

export const tmpPref = new Preference('http://localhost:8080/tempPrefer')
export const usrPref = new Preference('http://localhost:8080/user')