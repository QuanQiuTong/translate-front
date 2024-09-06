import { defineStore } from "pinia";

export const useUserstore = defineStore(
    'user',
    {
        state() {
            return {
                userName: 'userName',
                authKey: 'sunge',
                test: 'test'
            }
        }
    }
)

export const myUserStore = defineStore('user', {
    state:()=>{
        return {
            userName: 'QuanQiuTong',
            authKey: 'testAuthKey'
        }
    }
}
)

var userNameStore
var authKeyStore

export const storeUser = (userName: string, authKey: string): void => {

}
