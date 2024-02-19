import { Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PhoneListService } from '../phone-list.service';
import { LoginService } from '../login-servic.service';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  isSuperAdmin = false;
  isNormalAdmin = false;
  isNormalUser = false;

  constructor(
    private loginService: LoginService,
    private dataSharingService: DataSharingService,
    private router:Router ,
    private phoneListService: PhoneListService,
    private authService: AuthenticationService,



    ) {

  }
  ngOnInit(): void {

    this.authService.userRoles$.subscribe((roles) => {
      // // console.log(roles);
      
      this.isSuperAdmin = roles.includes('SuperAdmin');
      this.isNormalAdmin = roles.includes('Admin');
      this.isNormalUser = roles.includes('User');
    });



  }




  Array_FormGroupUsers = [
    {
      label_Content : 'Add User',
      ngif : `this.isNormalAdmin` ,
      routerLink : `/Users/AddUser`,
    },
    {
      label_Content : 'Edit User',
      ngif : `this.isNormalAdmin` ,
      routerLink : `/Users/EditUser`,
    },
    {
      label_Content : 'Add User to Group',
      ngif : `this.isNormalAdmin` ,
      routerLink : `/Users/usergroup`,
    },
  ]
}
