import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { redirectRoutes, roleAbbrevations } from '../config/redirect.routes';
import { LoginCred } from '../interfaces/auth.model';
import jwtDecode from 'jwt-decode';
import { SpinnerService } from '../utils/spinner.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = environment.base_url;
  private routes: any = redirectRoutes;
  private roles: any = roleAbbrevations;

  constructor(private router: Router, private http: HttpClient, private spinner: SpinnerService) { }

  getUser(element: string) {
    const data: any = this.jwtVerify();
    if (element === 'status')
      return data.status;
    if (element === 'role')
      return data.role;
    if (element === 'name')
      return data.full_name;
    if (element === 'email')
      return data.email;
  }

  jwtVerify() {
    try {
      const token = sessionStorage.getItem('profileToken')!;
      const decode: any = jwtDecode(token);
      this.roles.forEach((element: any) => {
        if (decode.role === element.role) {
          decode.role = element.abbrevated;
        }
      });
      return decode;
    }
    catch (err) {
      return false;
    }
  }

  login(credentials: LoginCred) {
    this.http.post<any>(`${this._url}/user/login`, credentials)
      .subscribe(response => {
        if (response.data.profileToken) {
          sessionStorage.setItem('profileToken', response.data.profileToken);
          const data: any = this.jwtVerify();
          if (data) {
            this.routes.forEach((el: any) => {
              if (data.role === el.role) {
                this.router.navigate([el.redirect_to]);
              }
            });
          }
        }
        else {
          this.spinner.change(false);
          this.spinner.showAlert(response.message, "error")
        }
      })
  }

  logout() {
    sessionStorage.removeItem('profileToken');
    this.router.navigate(['/login'])
  }
}
