export interface BanModel {
    banId: number
    userId: number
    user: {
        userId: string
        discordId: string
        createdAt: string
    }
    reason: string | null
    createdAt: Date
}