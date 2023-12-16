import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneListService } from '../phone-list.service';
import { LoginService } from '../login-servic.service';


@Component({
  selector: 'app-massage-us',
  templateUrl: './massage-us.component.html',
  styleUrls: ['./massage-us.component.css']
})
export class MassageUsComponent {
  UserNameText: FormGroup;
  itarbs: boolean = false;

  constructor(
    private fb: FormBuilder,
    private phoneListService: PhoneListService,
    public  loginService: LoginService,

  ) {
    this.UserNameText = this.fb.group({
      UserText: ['', Validators.required],
    });
    this.loginService.iseng$.subscribe((iseng: boolean) => {
      this.itarbs = iseng;
    });
  }

  ngOnInit(): void {
    this.UserNameText.get('userName')!.setValue(localStorage.getItem('User Name'));
  }

  onSubmit() {
    if (this.UserNameText.valid) {
      this.LoginShowPopup("Thanks For Help Us")
      this.UserNameText.reset()
    }
    else {
      this.LoginShowPopup("There No Text")

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
  getvaluetext()
  {
    if (!this.itarbs) {
      return `Call Technical Support `
    }
    else return `الاتصال بالدعم الفنى`
  }
  getvaluetextsent()
  {
    if (!this.itarbs) {
      return `Send`
    }
    else return `ارسال`
  }
  getvaluetextSuggest()
  {
    if (!this.itarbs) {
      return `Feed Back`
    }
    else return `اقتراح تعديلات`
  }
  getvaluetextMassage()
  {
    if (!this.itarbs) {
      return `Connect Us`
    }
    else return `تواصل معنا`
  }
}
