import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { LoginService } from '../login-servic.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  showLogo1: boolean = true;
  showLogo2: boolean = false;
  englag: boolean = false;

  constructor(private loginService: LoginService, private el: ElementRef) {
    loginService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.loginService.iseng$.subscribe((iseng: boolean) => {
      this.englag = iseng;
      // console.log(this.englag);
      
    });
  }
  animateLogos() {
    setTimeout(() => {
      this.showLogo1 = false;
      this.showLogo2 = true;
      setTimeout(() => {
        this.showLogo2 = false;
        this.showLogo1 = true;
      }, 20000); // Show logo 1 after logo 2 has rotated and been shown for 20 seconds
    }, 20000); // Show logo 2 after 20 seconds

    // Repeat the animation sequence
    setInterval(this.animateLogos.bind(this), 40000);
  }



  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.animateLogos()
  }
}
