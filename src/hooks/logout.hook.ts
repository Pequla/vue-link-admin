import { SessionManager } from "@/utils/session.manager"
import { useRouter } from "vue-router"

export function useLogout() {

    const router = useRouter()

    const logout = function () {
        SessionManager.clearAuth()
        router.push({
            path: '/login'
        })
    }

    return logout
}