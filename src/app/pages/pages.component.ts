/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';
import { AuthService } from '../@auth/auth.service';
import { Role } from '../@core/interfaces/enum';
import { I18nService } from '../@core/utils/i18n.service';
import { PagesMenu } from './pages-menu';

@Component({
    selector: 'ngx-pages',
    styleUrls: ['pages.component.scss'],
    template: `
    <ngx-one-column-layout>
        <nb-menu [items]="menu"></nb-menu>
        <router-outlet></router-outlet>
    </ngx-one-column-layout>
    `,
})
export class PagesComponent implements OnDestroy, OnInit {

    menu: NbMenuItem[];
    alive: boolean = true;

    constructor(
        private pagesMenu: PagesMenu,
        private tokenService: NbTokenService,
        private translateService: TranslateService,
        private authService: AuthService,
        private i18nService: I18nService
    ) {
        if (!this.i18nService.getLocaleLanguage()) {
            this.i18nService.changeLanguage(this.i18nService.language);
        } else {
            this.i18nService.language = this.i18nService.getLocaleLanguage();
            this.translateService.use(this.i18nService.language);
        }
        this.initMenu();
        this.tokenService.tokenChange()
            .pipe(takeWhile(() => this.alive))
            .subscribe(() => this.initMenu());
    }

    ngOnInit(): void {
        this.getRole()
    }

    initMenu() {
        this.pagesMenu.getMenu()
            .pipe(takeWhile(() => this.alive))
            .subscribe(menus => {
                for (const menu of menus) {
                    this.translateService.get('Menu.' + menu.title).subscribe(data => menu.title = data)
                    if (menu?.children?.length > 0) {
                        for (const children of menu?.children) {
                            this.translateService.get('Menu.' + children.title).subscribe(data => children.title = data)
                        }
                    }
                }
                this.menu = menus;
            });
    }

    getRole() {
        for (const menu of this.menu) {
            if (menu.data) {
                menu.hidden = !this.authService.isRole(menu.data)
            } else {
                menu.hidden = false
            }
        }
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}