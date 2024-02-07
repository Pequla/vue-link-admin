import { TokenModel } from "@/models/token.model";

export class SessionManager {
    public static saveAuth(model: TokenModel) {
        sessionStorage.clear()
        sessionStorage.setItem('auth', JSON.stringify(model))
    }

    private static getAuth(): TokenModel {
        const ss = sessionStorage.getItem('auth')
        if (ss == undefined) throw new Error('NO_LOGIN_DATA')
        return JSON.parse(ss)
    }

    public static getAccessToken() {
        return this.getAuth().access
    }

    public static getRefreshToken() {
        return this.getAuth().refresh
    }

    public static hasAuth() {
        if (sessionStorage.getItem('auth')) {
            return true
        }
        return false
    }

    public static clearAuth() {
        sessionStorage.clear()
    }
}