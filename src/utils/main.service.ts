import axios, { AxiosError, AxiosResponse } from "axios";
import { SessionManager } from "./session.manager";

const client = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    validateStatus: function (status) {
        return status == 200 || status == 204
    }
})

export class MainService {
    public static async login(username: string, password: string) {
        return await client.request({
            url: '/admin/login',
            method: 'post',
            data: {
                username: username,
                password: password
            }
        })
    }
    public static async useAxios(url: string, method: string = 'GET', body: object = {}) {
        // Attempting to retrieve data
        let rsp: AxiosResponse;

        try {
            rsp = await client.request({
                url: url,
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${SessionManager.getAccessToken()}`
                },
                data: body
            }) as AxiosResponse;
        } catch (e) {
            rsp = (e as AxiosError).response as AxiosResponse
        }

        if (rsp == undefined) {
            throw new Error('BACKEND_UNREACHABLE')
        }

        if (rsp.status == 403) {
            // Refresh token
            try {
                const tokenReq = await client.request({
                    url: '/admin/refresh',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${SessionManager.getRefreshToken()}`
                    },
                    data: body
                })

                // Save token
                SessionManager.saveAuth(tokenReq.data)

                // Repeating the primary request
                return await client.request({
                    url: url,
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${SessionManager.getAccessToken()}`
                    },
                    data: body
                });
            } catch (e) {
                SessionManager.clearAuth()
                throw new Error('REFRESH_FAILED')
            }
        }

        if (rsp.status == 404) {
            throw new Error('NOT_FOUND')
        }

        // Return response
        return rsp;
    }

    public static async getSelf() {
        return await this.useAxios('/admin/self')
    }

    public static async getData() {
        return await this.useAxios('/data')
    }

    public static async getDataById(id: number) {
        if (Number.isNaN(id))
            throw new Error('NAN_ARGUMENT')
        return await this.useAxios('/data/' + id)
    }

    public static async searchData(query: string) {
        return await this.useAxios('/data/search/' + query)
    }

    public static async deleteData(id: number) {
        return await this.useAxios('/data/' + id, 'delete')
    }

    public static async getTokens() {
        return await this.useAxios('/token')
    }

    public static async createToken() {
        return await this.useAxios('/token', 'post')
    }

    public static async deleteToken(id: number) {
        return await this.useAxios('/token/' + id, 'delete')
    }
}