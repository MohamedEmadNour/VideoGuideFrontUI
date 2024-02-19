import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneListService } from '../phone-list.service';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  registrationForm: FormGroup;
  isSuperAdmin = false;
  isNormalAdmin = false;
  isNormalUser = false;

  Roles : any[] = [];
  Active : any;

  constructor(
    private fb: FormBuilder,
     private phoneListService: PhoneListService ,
     private authService : AuthenticationService,
     ) {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      // password: ['', Validators.required],
      fullName: ['', Validators.required],
      active: ['', Validators.required],
      roles: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.authService.userRoles$.subscribe((roles) => {
      // // console.log(roles);
      
      this.isSuperAdmin = roles.includes('SuperAdmin');
      this.isNormalAdmin = roles.includes('Admin');
      this.isNormalUser = roles.includes('User');

      // // console.log(this.isSuperAdmin);
      // // console.log(this.isNormalAdmin);
      
    });
  }
  

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = {
        userName: this.registrationForm.get('userName')?.value,
        fullName: this.registrationForm.get('fullName')?.value,
        active: this.Active,
        roles: this.Roles,
      };
      this.phoneListService.EditUser(userData).subscribe( {
       next:(response: any) => {
        this.LoginShowPopup("User Registration Suc")
        this.registrationForm.reset()
        },
        error : (error: any) => {
          // // console.log(error);
          // // console.log(userData);
          
          
        this.LoginShowPopup("User Registration False ")
          

        }
      })
  }
}
LoginShowPopup(x: string): void {
  const y = `top: 45%; right: 50%; color: White; `;
  const popup = document.getElementById('popup');
  if (popup) {
    popup.innerHTML = x;
    popup.style.cssText = y;
    popup.style.backgroundColor = ` #e616166e `;
    popup.style.display = 'block';

    setTimeout(() => {
      if (popup) {
        popup.style.display = 'none';
      }
    }, 1500);
  }
}

onRolesChange(selectedGroup: any){
  // // console.log(selectedGroup);

  // // console.log(selectedGroup.$ngOptionLabel);

  if (selectedGroup) {
    this.Roles.push(selectedGroup.$ngOptionLabel);
    // // console.log(this.Roles);
    // // console.log(selectedGroup);
    
  }
}
onActiveChange(selectedGroup: any){
  // // console.log(selectedGroup);

  // // console.log(selectedGroup.$ngOptionLabel);

  if (selectedGroup) {
    this.Active = selectedGroup.$ngOptionLabel;
    // // console.log(this.Roles);
    // // console.log(selectedGroup);
    
  }
}

}
