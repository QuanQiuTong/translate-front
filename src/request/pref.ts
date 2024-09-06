import axios from 'axios';

const req = (url: string, obj = {}) =>
    axios.post('api' + url, { sessionId: parseInt(localStorage.sessionID), ...obj }, {
        withCredentials: true,
        headers: { 'Authorization': localStorage.token }
    })

export const initPreferences = (): void => {
    console.log('initPreferences');
    if (!localStorage.style) {
        req('/tempPrefer/getStyle')
            .then(res => {
                console.log(res.data);
                localStorage.style = res.data.data ? res.data.data : 'default';
                console.log('style not found');
            });
    }
    if (!localStorage.sourceLanguage || !localStorage.targetLanguage) {
        req('/tempPrefer/getLanguage')
            .then(res => {
                console.log(res.data);
                localStorage.sourceLanguage = res.data.data ? res.data.data.source_language : 'en';
                localStorage.targetLanguage = res.data.data ? res.data.data.target_language : 'zh';
                console.log('language not found');
            });
    }
}

export const postStyle = (style: string, url: string = '/tempPrefer') =>
    req(url + "/setStyle", { style }).then(res => { console.log(res.data) })

export const setLanguage = (url: string = "/tempPrefer") => {
    console.log('setLanguage:\n',
        url + "/setLanguage",
        localStorage.sessionID,
        localStorage.sourceLanguage,
        localStorage.targetLanguage);
    req(url + "/setLanguage", {
        source_language: localStorage.sourceLanguage,
        target_language: localStorage.targetLanguage
    }).then(res => { console.log(res.data) })
}

const Req = (url: string, obj = {}) =>
    axios.post("api/" + url, { session_id: parseInt(localStorage.sessionID), ...obj },
        { headers: { 'Authorization': localStorage.token } })

export const getReplace = (url = 'session') =>
    url == "session" ? Req(url + "/getReplace") :
        axios.get("api/" + url + "/getReplace", { headers: { 'Authorization': localStorage.token } })

export const postReplace = (replace_from: string, replace_to: string, url = 'session') =>
    Req(url + "/setReplace", { replace_from, replace_to })
        .then(res => { console.log(res.data) })

export const deleteReplace = (origin: string, url = 'session') =>
    axios.delete("api/" + url + "/deleteReplace", {
        data: {
            session_id: parseInt(localStorage.sessionID),
            replace_from: origin
        },
        headers: { Authorization: localStorage.token }
    }).then(res => { console.log(res.data) })



export const getPrompt = async (url = 'api/userPrefer/getPrompt') =>
    axios.get(url, { headers: { Authorization: localStorage.token } })

export const postPrompt = (prompt_content: string, url = 'api/userPrefer/setPrompt') =>
    axios.post(url, { prompt_content },
        { headers: { Authorization: localStorage.token } })
        .then(res => { console.log(res.data) })

export const deletePrompt = (prompt: string, url = 'api/userPrefer/deletePrompt') =>
    axios.delete(url,
        {
            data: { prompt_content: prompt },
            headers: { Authorization: localStorage.token }
        }).then(res => { console.log(res.data) })

