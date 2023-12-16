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

  constructor(
    private fb: FormBuilder,
     private phoneListService: PhoneListService ,
     private authService : AuthenticationService,
     ) {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      Role: ['', Validators.required],
      active: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.authService.userRoles$.subscribe((roles) => {
      // console.log(roles);
      
      this.isSuperAdmin = roles.includes('SuperAdmin');
      this.isNormalAdmin = roles.includes('Admin');
      this.isNormalUser = roles.includes('User');

      // console.log(this.isSuperAdmin);
      // console.log(this.isNormalAdmin);
      
    });
  }
  

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      this.phoneListService.EditUser(userData).subscribe( {
       next:(response: any) => {
        this.LoginShowPopup("User Registration Suc")
        this.registrationForm.reset()
        },
        error : (error: any) => {
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

}
