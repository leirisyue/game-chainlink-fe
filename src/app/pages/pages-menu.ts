import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Role } from '../@core/interfaces/enum';

@Injectable()
export class PagesMenu {

  getMenu(): Observable<NbMenuItem[]> {
    const menus: NbMenuItem[] = [
      {
        title: 'Dashboard',
        icon: 'home-outline',
        link: '/pages/dashboard',
        children: undefined,
      },
      {
        title: 'System',
        icon: 'bar-chart-2',
        data: Role.SYSTEM,
        expanded: true,
        children: [
          {
            title: 'Khách hàng',
            link: '/pages/system/relying-party',
          }, {
            title: 'Packages',
            link: '/pages/system/packages',
          },
        ],
      },
      {
        title: 'Endpoint',
        icon: 'bar-chart-2',
        data: Role.ADMIN,
        expanded: true,
        children: [
          {
            title: 'Users',
            link: '/pages/endpoint/users',
          }, {
            title: 'Log',
            link: '/pages/endpoint/log',
          },
        ],
      },
      {
        title: 'User',
        icon: 'bar-chart-2',
        data: Role.USER,
        expanded: true,
        children: [
          {
            title: 'game',
            link: '/pages/user/game',
          }
        ],
      },
    ]
    return of([...menus,]);
  }
}