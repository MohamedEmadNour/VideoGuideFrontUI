import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneListService } from '../phone-list.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent implements OnInit {
  passwordChangeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private phoneListService: PhoneListService,
  ) {
    this.passwordChangeForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      newPassword: ['', Validators.required , Validators.min(6)],
    });
  }

  ngOnInit(): void {
    this.passwordChangeForm.get('userName')!.setValue(localStorage.getItem('UserCode'));
  }

  onSubmit() {
    if (this.passwordChangeForm.valid) {
      const newPasswordData = this.passwordChangeForm.value;
      this.phoneListService.changePassword(newPasswordData).subscribe({
        next: (response: any) => {
          // console.log(response);
          this.LoginShowPopup("User Password Change Suc")
          this.passwordChangeForm.reset()

        },
        error: (error: any) => {
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
