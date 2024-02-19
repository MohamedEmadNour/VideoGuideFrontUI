import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneListService } from '../phone-list.service';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent {
  restpassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private phoneListService: PhoneListService,
  ) {
    this.restpassword = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.restpassword.get('userName')!.setValue(localStorage.getItem('User Name'));
  }

  onSubmit() {
    if (this.restpassword.valid) {
      const newPasswordData = this.restpassword.value;
      this.phoneListService.restPassword(newPasswordData).subscribe({
        next: (response: any) => {
          // // console.log(response);
          this.LoginShowPopup("User rest Suc")
          this.restpassword.reset()

        },
        error: (error: any) => {
          // // console.log(error);
          this.LoginShowPopup("Error Server")
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

