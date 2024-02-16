import { AuthModel } from "@/models/auth.model";

export class SessionManager {
    public static saveAuth(model: AuthModel) {
        localStorage.clear()
        localStorage.setItem('auth', JSON.stringify(model))
    }

    private static getAuth(): AuthModel {
        const ss = localStorage.getItem('auth')
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
        if (localStorage.getItem('auth')) {
            return true
        }
        return false
    }

    public static clearAuth() {
        localStorage.clear()
    }
}