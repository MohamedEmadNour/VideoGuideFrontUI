import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  _username = new BehaviorSubject<string>(``);
  username$ = this._username.asObservable();

  _isInData = new BehaviorSubject<boolean>(false);
  isInData$ = this._isInData.asObservable();

  _adminclock = new BehaviorSubject<boolean>(false);
  adminclock$ = this._adminclock.asObservable();

  _Data = new BehaviorSubject<string>(``);
  Data$ = this._Data.asObservable();

  _dataTag = new BehaviorSubject<string>(``);
  dataTag$ = this._dataTag.asObservable();

  _dataTagState = new BehaviorSubject<boolean>(false);
  dataTagState$ = this._dataTagState.asObservable();
  // isLoggedInChanged = new EventEmitter<boolean>();
  _isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this._isAdmin.asObservable();

  _iseng = new BehaviorSubject<boolean>(false);
  iseng$ = this._iseng.asObservable();
  
  _isVideo = new BehaviorSubject<boolean>(true);
  isVideo$ = this._isVideo.asObservable();

  private _IsFavChange = new BehaviorSubject<boolean>(false);
  IsFavChange$ = this._IsFavChange.asObservable();

  constructor(
    private router:Router,
    public authService :AuthenticationService
     ) {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus === 'true') {
      this._isLoggedIn.next(true);
    }
  }

  login(credentials: any , username : string ): void {
    this._isLoggedIn.next(true);
    this._username.next(username);
    // localStorage.setItem('isLoggedIn', 'true');
    // localStorage.setItem('userRole', 'admin');
    this.authService.setToken(credentials);
    localStorage.setItem('usertoken', credentials);
    // // console.log(credentials);
   
    this.router.navigate(['/home']);
    // this.isLoggedInChanged.emit(true);
  }
  IsFavForateChanged(change: boolean): void {
    this._IsFavChange.next(change);
  }

  isInDataChange(change : boolean): void{
    this._isInData.next(change); 
  }
  isInVideoChange(change : boolean): void{
    this._isVideo.next(change); 
  }
  isInCategroeValue(datacategore:string ): void{
    this._Data.next(datacategore); 
  }
  isInTagValue(dataTag:string ): void{
    this._dataTag.next(dataTag); 
  }
  isInTagChange(change : boolean ): void{
    this._dataTagState.next(change); 
  }

  isadminclicked ( isadminclicked : boolean  )
  {
    this._adminclock.next(isadminclicked); 
    // // console.log(isadminclicked);
  }

  isInLangChange(change : boolean ): void{
    this._iseng.next(change); 
  }
  logout(): void {
    this._isLoggedIn.next(false);
    localStorage.clear();
    this._isAdmin.next(false);

    this.router.navigate(['']);

    // this.isLoggedInChanged.emit(false);
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

  get isInData(): boolean {
    return this._isInData.value;
  }



  isAdmin(): boolean {
    const userToken = localStorage.getItem('usertoken'); // Get the user token from localStorage
    if (userToken) {
      const tokenData = JSON.parse(atob(userToken.split('.')[1])); // Parse the token
      // Access the role claim using the full claim name
      // // console.log(tokenData);
      this._isAdmin.next(true);

      
      return tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin';
    }
    return false; // Return false if no token or role is not 'admin'
  }


}
