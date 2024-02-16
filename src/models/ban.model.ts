export interface BanModel {
    banId: number
    userId: number
    user: {
        userId: string
        discordId: string
        createdAt: string
    }
    admin: {
        username: string
    }
    reason: string | null
    createdAt: Date
}