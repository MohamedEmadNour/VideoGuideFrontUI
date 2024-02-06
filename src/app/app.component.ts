import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './login-servic.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  isLoggedIn: boolean = false;
  itarbs: boolean = false;
  itarbsallaw: boolean = false;
  LoadingScreen: boolean = true;


  
  constructor(
    private router: Router,
    // private dataSharingService: DataSharingService,
    public loginService: LoginService,
    // private phoneListService: PhoneListService,
    // private _HttpClient: HttpClient,
    // private route: ActivatedRoute,
    // private modalService: ModalService,
    // private activeModal: NgbActiveModal,
    // private SignalRService: SignalRService,
    // private modalServices: NgbModal,
  ) {
    loginService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      localStorage.clear()
    }
    this.router.navigate(['/home']);
    
  }
  FetchFavDataName(){
    if (!this.itarbs) {
      return "عربى";
    } 
    else
    {
      return "English";
    }
  }

  langChange ()
  { 
    this.itarbsallaw = true
    if (!this.itarbs) {
      this.itarbs = true
      this.loginService.isInLangChange( true )
      setTimeout(() => {
        this.itarbsallaw = false
      }, 5000);
    }
    else{ 
      this.itarbs = false
      this.loginService.isInLangChange( false )
      setTimeout(() => {
        this.itarbsallaw = false
      }, 5000);
    }
  }
 



  
  

  
  



  
  


}


