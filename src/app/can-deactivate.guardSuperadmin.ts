import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isSuperAdmin()) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/unauthorized']); // Redirect to an unauthorized page
      return false; // Prevent access to the route
    }
  }
}
