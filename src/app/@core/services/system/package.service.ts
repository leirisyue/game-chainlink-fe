import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../backend/common/api/http.service';
import { PackageDto, ServicePackageDto, SystemUsageDto } from '../../interfaces/system/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  path = 'system/packages'

  constructor(
    private api: HttpService,
  ) { }

  createRelyingPartyPackage(form: PackageDto): Observable<PackageDto> {
    return this.api.post(this.path, form)
  }

  updateRelyingPartyPackage(form: PackageDto, id: string): Observable<PackageDto> {
    return this.api.put(this.path + `/${id}`, form)
  }

  deleteRelyingPartyPackage(id: string): Observable<PackageDto> {
    return this.api.delete(this.path + `/${id}`)
  }

  activateRelyingPartyPackage(id: string): Observable<PackageDto> {
    return this.api.put(this.path + `/${id}/activate`, null)
  }

  getRelyingPartyServicePackage(idRely: string): Observable<PackageDto[]> {
    return this.api.get(`system/relying-party/${idRely}/packages`)
  }

  getRelyingPartyServiceLicense(idRely: string): Observable<ServicePackageDto> {
    return this.api.get(`system/relying-party/${idRely}/license`)
  }

  getSystemUsage(): Observable<SystemUsageDto> {
    return this.api.get('system/usage')
  }
}
