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
   filter?: string
}

export class RelyingPartyUpdateForm {
   name: string
   origin: string
   description: string
}


export class EndpointInfoUpdateForm {
   name: string
   subdomains: string[]
   ports: number[]

}