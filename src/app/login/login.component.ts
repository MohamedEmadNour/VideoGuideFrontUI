import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login-servic.service';
import { PhoneListService } from '../phone-list.service';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication.service'





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;
  username : any = ""
  Fullname : any = ""
  UserName : any = ""
  userId : any = ""
  itarbs: boolean = false

  constructor( 
    private phoneListService: PhoneListService , 
    private fb: FormBuilder, 
    public  loginService: LoginService,
    private authService: AuthenticationService

    
    ) {
    loginService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.loginService.iseng$.subscribe((iseng: boolean) => {
      this.itarbs = iseng;
    });

    this.loginForm = this.fb.group({
      userName: ['123', Validators.required],
      password: [''],
    });


    // this.loginForm = this.fb.group({
    //   userName: ['100003494', Validators.required],
    //   password: ['12211221'],
    // });
  }

  

  ngOnInit(): void {
    
    this.username = localStorage.getItem("User Name")
    this.userId = localStorage.getItem("User ID")
    // Subscribe to isLoggedInChanged to react to changes
    // setTimeout(() => {
    //   this.onSubmit()
    // }, 1500);

  }

  logout(): void {
    this.loginForm.reset()
    this.loginService.logout();
    // window.location.reload();
  }

  showPopup(message: string): void {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.innerHTML = message;
      popup.style.display = 'block';

      setTimeout(() => {
        if (popup) {
          popup.style.display = 'none';
        }
      }, 1500);
    }
  };

  


  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.phoneListService.login(credentials).subscribe( {
        next:(response: any) => {
          //  console.log(response.user.Id);
          this.username = this.loginForm.value.userName;
          // console.log(this.username);
          this.userId = response.user.Id
          this.Fullname = response.user.FullName
          this.UserName = response.user.UserName
          this.isLoggedIn = true
          this.loginService.login(response.Token , this.Fullname )
          //  window.location.reload();
          localStorage.setItem("User Name" , this.Fullname )
          localStorage.setItem("UserCode" , this.UserName )
          localStorage.setItem("User ID" , this.userId )
          // setTimeout(() => {
          //   this.logout()
          // }, 3600000);
          
         },
         error : (error: any) => {
          //  console.log(error);
          this.LoginShowPopup('Invalid email or password');
         }
       })
      // console.log(credentials);
       // Call the login method without .subscribe()
    } else {
      this.LoginShowPopup('Invalid email or password');
    }
  };
  
  

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
