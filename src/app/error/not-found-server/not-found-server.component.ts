import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'ngx-not-found-server',
  templateUrl: './not-found-server.component.html',
  styleUrls: ['./not-found-server.component.scss']
})
export class NotFoundServerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.timeOut()
  }

  goToHome() {
    this.router.navigateByUrl('auth/login')
  }

  timeOut() {
    setTimeout(() => {
    }, 5000);
  }



}
