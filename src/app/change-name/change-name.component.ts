import { Component, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneListService } from '../phone-list.service';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent {
  UserNameChangeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private phoneListService: PhoneListService,
    private router:Router 
  ) {
    this.UserNameChangeForm = this.fb.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.UserNameChangeForm.get('userName')!.setValue(localStorage.getItem('User Name'));
  }

  onSubmit() {
    if (this.UserNameChangeForm.valid) {
      const NewNameChange = this.UserNameChangeForm.value;
      console.log(NewNameChange);

      this.phoneListService.changeUserName(NewNameChange).subscribe({
        next: (response: any) => {
          console.log(response);
          this.LoginShowPopup("New Name Change Suc")
          this.UserNameChangeForm.reset()
          this.router.navigate(['/home']);



        },
        error: (error: any) => {
          console.log(error);

          this.LoginShowPopup(error.error.title)
        },
      });
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
