export class CustomCreateForm {
   username: string
   displayName: string
   relyingPartyId: string
   remember: boolean
   timeoutInSeconds: number
   password: string
   rePassword: string
   constructor() {
      this.username = ''
      this.displayName = ''
      this.relyingPartyId = ''
      this.remember = false
      this.timeoutInSeconds = null
      this.password = ''
      this.rePassword = ''
   }
}