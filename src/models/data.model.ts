export interface DataModel {
    dataId: number
    uuid: string
    userId: number
    user: {
        userId: string
        discordId: string
        createdAt: string
    }
    guildId: number
    guild: {
        guildId: string
        discordId: string
        createdAt: string
    }
    createdAt: string
}