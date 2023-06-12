export class AccessToken {
    id: string
    subject: string
    token: string
    expiresAt: Date
}

export class SystemLoginForm {
    account: string
    password: string
    remember: boolean
}

export class EndpointLoginForm {
    clientId: string
    clientSecret: string
    timeoutInSeconds: number
}

