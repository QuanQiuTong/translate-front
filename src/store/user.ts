import { defineStore } from "pinia";

export const useUserstore = defineStore(
    'user',
    {
        state() {
            return {
                userName: 'userName'
            }
        }
    }
)
export const userStore = defineStore({
    id: 'user',
    state() {
        return {
            userName: 'userName',
            authKey: 'authKey'
        }
    }
})