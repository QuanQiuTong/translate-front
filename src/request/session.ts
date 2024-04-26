import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8080/session',
    timeout: 2000,
    withCredentials: true,
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

export const newSession = async () => {
    let res = await request.get('/create')
    console.log(res.data)
    let sessionID = parseInt(res.data.data)
    localStorage.sessionID = sessionID
    return sessionID
}

export const getSessionList = async () => {
    let res = await request.get('/list')
    console.log(res.data)
    return res.data.data
}

export const latestSession = async (): Promise<sessionOutline> => {
    let res = await getSessionList()
    if (res.length === 0) {
        await newSession()
        res = await getSessionList()
    }
    let outline: sessionOutline = res[res.length - 1]
    // localStorage.sessionID = outline.sessionId
    return outline
}

const setPreference = async (style: string, sourceLanguage: string, targetLanguage: string) => {
    let res = await axios.post(
        'http://localhost:8080/tempPrefer/setLanguage', {
        sessionId: parseInt(localStorage.sessionID),
        source_language: sourceLanguage,
        target_language: targetLanguage
    }, {
        withCredentials: true,
        headers: { Authorization: localStorage.token }
    })
    await axios.post(
        'http://localhost:8080/tempPrefer/setStyle', {
        sessionId: parseInt(localStorage.sessionID),
        style: style
    }, {
        withCredentials: true,
        headers: { Authorization: localStorage.token }
    })

    console.log('setPreference')
    console.log(res.data)
    console.log('____________________')
}

export const initializeSession = (): void => {
    latestSession().then(res => {
        //console.log('initializeSession'), console.log(res);
        localStorage.sessionID = res.sessionId
        if (res.sourceLanguage && res.targetLanguage && res.style) {
            localStorage.sourceLanguage = res.sourceLanguage
            localStorage.targetLanguage = res.targetLanguage
            localStorage.style = res.style
        } else {
            localStorage.sourceLanguage = 'en'
            localStorage.targetLanguage = 'zh'
            localStorage.style = 'default'
            setPreference(localStorage.style, localStorage.sourceLanguage, localStorage.targetLanguage)
        }
        //console.log(localStorage.sourceLanguage, localStorage.targetLanguage, localStorage.style)
    })
}