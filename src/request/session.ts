import axios from 'axios'

<<<<<<< HEAD
const req = axios.create({
    baseURL: 'api',
=======
const request = axios.create({
    baseURL: 'api/session',
>>>>>>> 1af6457cb3c2d72dc1843bb870373deb5458be0f
    timeout: 2000,
    withCredentials: true,
})

req.interceptors.request.use(
    config => { config.headers.Authorization = localStorage.token; return config }
)

export interface sessionOutline {
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

export const newSession = () => req.get('/session/create'),
    getSessionList = () => req.get('/session/list')

export const latestSession = async (): Promise<sessionOutline> => {
    let res = (await req.get('/session/list')).data.data
    if (res.length === 0) {
        await req.get('/session/create')
        res = (await req.get('/session/list')).data.data
    }
    let outline: sessionOutline = res[res.length - 1]
    // localStorage.sessionID = outline.sessionId
    return outline
}

const setPreference = async (style: string, sourceLanguage: string, targetLanguage: string) => {
<<<<<<< HEAD
    let res = await req.post('/tempPrefer/setLanguage', {
=======
    let res = await axios.post(
        'api/tempPrefer/setLanguage', {
>>>>>>> 1af6457cb3c2d72dc1843bb870373deb5458be0f
        sessionId: parseInt(localStorage.sessionID),
        source_language: sourceLanguage,
        target_language: targetLanguage
    })
<<<<<<< HEAD
    await req.post('/tempPrefer/setStyle', {
=======
    await axios.post(
        'api/tempPrefer/setStyle', {
>>>>>>> 1af6457cb3c2d72dc1843bb870373deb5458be0f
        sessionId: parseInt(localStorage.sessionID),
        style: style
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