export interface userJWTPayload {
    id: string
    provider: string
}

export interface userGoogleProfile {
    data: {
        sub: string
        name: string
        given_name: string
        family_name: string
        picture: string
    }
}
