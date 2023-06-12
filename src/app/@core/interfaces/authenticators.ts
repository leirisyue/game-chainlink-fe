export class AuthenticatorDto {
   id: string
   name: string
   credentialId: string
   aaguid: string
   coseKey: string
   attestationFormat: string
   authenticatorTransports: string[]
   createdDate: Date
   lastAccess: Date
   format: string
   counter: number
   UserId?: string
}

export class UserAuthenticatorUpdateForm {
   name: string
}