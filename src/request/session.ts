import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8080/session',
})

request.interceptors.request.use(
    config => {
        config.headers.Authorization = localStorage.token
        return config
    }, error => {
        return Promise.reject(error)
    }
)

interface sessionOutline {
    createTime: string,
    sessionId: number,
    sourceLanguage: string,
    sourcePassage: string,
    style: string,
    targetLanguage: string,
    targetPassage: string,
    updateTime: string,
    userId: number
}

export async function newSession() {
    let res = await request.get('/create')
    console.log(res.data)
    let sessionID = parseInt(res.data.data)
    localStorage.sessionID = sessionID
    return sessionID
}

export async function getSessionList() {
    let res = await request.get('/list')
    console.log(res.data)
    return res.data.data
}

export async function latestSession(): Promise<sessionOutline> {
    let res = await getSessionList()
    let outline: sessionOutline = res[res.length - 1]
    // localStorage.sessionID = outline.sessionId
    return outline
}

export function initializeSession(): any {
    // let tmpPref = new Preference('http://localhost:8080/preference')
    // tmpPref.setStyle('default')
    // tmpPref.setLanguage('en', 'zh')
    // tmpPref.setReplaceWords('the', 'a')
    
    

}