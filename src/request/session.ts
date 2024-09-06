import axios from "axios";
import { setLanguage, postStyle } from "./pref";

const req = axios.create({
    baseURL: "api",
    timeout: 2000,
    withCredentials: true,
});

req.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.token;
    return config;
});

export interface sessionOutline {
    createTime: string;
    sessionId: number;
    sourceLanguage: string;
    sourcePassage: string;
    style: string;
    targetLanguage: string;
    targetPassage: string;
    updateTime: string;
    userId: number;
}

export const newSession = () => req.get("/session/create");

export const getSessionList = () => req.get("/session/list");

export const getSessionByID = async () =>
    (await req.post("/session/info",
        { sessionId: parseInt(localStorage.sessionID) })).data.data;

export const delSession = (sessionId: number) =>
    req
        .delete("/session/delete", { data: { sessionId } })
        .then((res) => console.log(res.data));

export const starSession = (sessionId: number) =>
    req.post("/session/star", { sessionId }).then((res) => console.log(res.data));

export const unstarSession = (sessionId: number) =>
    req
        .post("/session/unstar", { sessionId })
        .then((res) => console.log(res.data));

export const latestSession = async () => {
    let res = (await req.get("/session/list")).data.data;
    if (res.length === 0) {
        await req.get("/session/create");
        res = (await req.get("/session/list")).data.data;
    }
    let outline: sessionOutline = res[res.length - 1];
    // localStorage.sessionID = outline.sessionId
    return outline;
};

export const initializeSession = async () => {
    let res = localStorage.sessionID ?
        await getSessionByID() :
        await latestSession();

    console.log("initializeSession\n", res);
    localStorage.sessionID = res.sessionId;
    localStorage.sourceLanguage = res.sourceLanguage ?? "en";
    localStorage.targetLanguage = res.targetLanguage ?? "zh";
    setLanguage();
    if (res.style) localStorage.style = res.style; else {
        localStorage.style = "default";
        postStyle(localStorage.style);
    }
    //console.log(localStorage.sourceLanguage, localStorage.targetLanguage, localStorage.style)
    return res;
};
