import { PackageType } from "../enum"

export class PackageDto {
   id: string
   amount: number
   type: PackageType
   createdDate: Date
   activatedDate: Date
   description: string
   relyingPartyId: string
   typeLicense?: string
}

export class ServicePackageDto {
   user: QuantityDto
   subdomain: QuantityDto
   port: QuantityDto
   time: DurationDto
   packages: PackageDto[]
}

export class QuantityDto {
   totalQuantity: number
   usedQuantity: number
   freeQuantity: number
}

export class DurationDto {
   expiration: Date
   remaining: number
}

export class SystemUsageDto {
   relyingParties: number
   userAccounts: number
   userAuthenticators: number
   createdPackages: number
   activatedPackages: number
   constructor() {
      this.relyingParties = 0
      this.userAccounts = 0
      this.userAuthenticators = 0
      this.createdPackages = 0
      this.activatedPackages = 0
   }
}
