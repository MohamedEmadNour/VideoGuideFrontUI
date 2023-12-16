// authentication.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authToken: string | null = null;
  private userRolesSubject = new BehaviorSubject<string[]>([]);
  userRoles$: Observable<string[]> = this.userRolesSubject.asObservable();

  setToken(token: string): void {
    this.authToken = token;
    const userRoles = this.extractRolesFromToken(token);
    this.userRolesSubject.next(userRoles);
  }

  private extractRolesFromToken(token: string): string[] {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || [];
    } catch (error) {
      console.error('Error decoding token:', error);
      return [];
    }
  }

  hasRole(role: string): boolean {
    const userRoles = this.userRolesSubject.value;
    return userRoles.includes(role);
  }
  // Check for specific roles
  isSuperAdmin(): boolean {
    return this.hasRole('SuperAdmin');
  }

  isNormalAdmin(): boolean {
    return this.hasRole('Admin');
  }

  isNormalUser(): boolean {
    return this.hasRole('User');
  }

  getRoles(): string[] {
    return this.userRolesSubject.value;
  }
}
