import { Component } from '@angular/core';
import { LoginService } from '../login-servic.service';

import { AuthenticationService } from '../authentication.service'


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  autoplay = false;
  loop = false;
  itarbs: boolean= false;

  constructor (
    private authService: AuthenticationService,
    private loginService: LoginService,
  ){

    this.loginService.iseng$.subscribe((iseng: boolean) => {
      this.itarbs = iseng;
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.autoplay = true;
    this.loop = true;
  }
}
