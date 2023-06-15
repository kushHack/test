import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth-service.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.authService.getUser('role');
    if (currentUser) {
      if (route.data["role"] && route.data["role"].indexOf(currentUser) === -1) {
        this.router.navigate(['/404']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}