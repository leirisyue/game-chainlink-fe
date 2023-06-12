
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class ThemeBgService {

   constructor(
   ) {
   }

   changeThemeCookie(theme: string) {
      localStorage.removeItem("themeAccouting");
      localStorage.setItem("themeAccouting", theme);
      //console.log(localStorage.getItem('themeAccouting'));
   }

   getThemeCookie() {
      let theme = localStorage.getItem("themeAccouting")
      return theme ? theme : 'default'
   }

}
