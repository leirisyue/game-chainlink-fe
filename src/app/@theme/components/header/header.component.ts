import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../@auth/auth.service';
import { InvalidateService } from '../../../@core/backend/get/invalidate.service';
import { ThemeBgService } from '../../../@core/backend/get/theme-bg.service';
import { User } from '../../../@core/interfaces/common/users';
import { PARTITION_ID, PROJECT_NAME } from '../../../@core/interfaces/variable';
import { LayoutService } from '../../../@core/services/utils';
import { ConfigService } from '../../../@core/services/utils/config.service';
import { I18nService } from '../../../@core/utils/i18n.service';
import { MessageService } from '../../../@core/utils/message.service';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;
  logo: any
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];
  currentTheme = 'default';
  // userMenu = this.getMenuItems();
  personal: any
  partitionId = ''
  projectName = PROJECT_NAME
  listAccountLogin: User[]
  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private i18nService: I18nService,
    private translateService: TranslateService,
    private configService: ConfigService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    public invalidateService: InvalidateService,
    private themeBgService: ThemeBgService,
    public authService: AuthService,
    private messageService: MessageService,
  ) {
    if (!this.i18nService.getLocaleLanguage()) {
      this.i18nService.changeLanguage(this.i18nService.language);
    } else {
      this.i18nService.language = this.i18nService.getLocaleLanguage();
      this.translateService.use(this.i18nService.language);
    }
    const theme = themeBgService.getThemeCookie()
    if (theme) {
      this.changeTheme(theme)
    }
  }
  async ngOnInit() {
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
    this.themeService.onThemeChange().pipe(map(({ name }) => name), takeUntil(this.destroy$),).subscribe(themeName => this.currentTheme = themeName);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async changeTheme(themeName: string) {
    await this.themeService.changeTheme(themeName);
    this.themeBgService.changeThemeCookie(themeName)
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    this.configService.checkSidebar = !this.configService.checkSidebar
    return false;
  }
  navigateLogOut() {

  }
  navigateProfile() {
    this.router.navigateByUrl('/pages/profile/info')
  }
  goToLogin() {
    this.router.navigateByUrl('/login')
  }
  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  // openForm() {
  //   this.dialog.open(SelectCompanyComponent, {
  //     panelClass: 'custom-modalbox',
  //     position: { top: '20px' }
  //   });
  // }

  async logout() {
    const isYes = await this.messageService.getSwal('Bạn có muốn đăng xuất khỏi hệ thống?')
    if (isYes) {
      await this.authService.removeTokens()
      window.location.reload()
    }

  }
}
