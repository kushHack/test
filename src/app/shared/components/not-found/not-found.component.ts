import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { redirectRoutes } from 'src/app/shared/config/redirect.routes';
import { AuthService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public userRole: string = '';
  public userAuth: any = null;
  public routes: any = redirectRoutes;

  constructor(private titleService: Title, private router: Router, private authService: AuthService) {
    this.titleService.setTitle('404 Not-Found')
  }

  redirectNotFound() {
    this.routes.forEach((el: any) => {
      if (this.userRole === el.role) {
        this.router.navigate([el.redirect_to]);
      }
    });
  }

  redirectLogin() {
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUser('role');
    this.userAuth = this.authService.getUser('status');
  }
}
