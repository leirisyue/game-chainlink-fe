import { Status } from "../enum"

export class RelyingPartyDto {
   id: string
   secret: string
   name: string
   origin: string
   subdomains: []
   ports: []
   description: string
   createdDate: Date
   status: Status
   filter?: string
}

export class RelyingPartyUpdateForm {
   name: string
   subdomains: string[]
   ports: number[]
   description: string
}