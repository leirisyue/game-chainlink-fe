import { Status } from "../enum"

export class RelyingPartyDto {
   id: string
   secret: string
   name: string
   origin: string
   subdomains: []
   origins: []
   ports: []
   description: string
   createdDate: Date
   status: Status
   email: string
   phone: string
   filter?: string
}

export class RelyingPartyUpdateForm {
   name: string
   origin: string
   description: string
   email: string
   phone: string
}


export class EndpointInfoUpdateForm {
   name: string
   subdomains: string[]
   ports: number[]

}

export class Contact {
   name: string
   email: string
   address: string
   phone: string
   description: string
}