export class UserAccountDto {
   id: string
   userHandle: string
   userLogin: string
   userEmail: string
   displayName: string
   createdDate: Date
   relyingPartyId: string
   filter?: string
}

export class UserAccountCreateForm {
   username: string
   password: string
   displayName: string

}