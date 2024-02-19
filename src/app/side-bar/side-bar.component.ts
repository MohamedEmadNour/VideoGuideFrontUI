import { Component } from '@angular/core';
import { LoginService } from '../login-servic.service';
import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service'




@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent {
  adminclock : boolean = false
  
  isInData: boolean = false;
  TagsNameState: boolean = false;
  isLoggedIn: boolean = false;
  isUserIcons: boolean = false;
  username : any = ""
  CatrgoresName : string = ``
  TagsName : string = ``
  sharedData : string = ``




  isSuperAdmin = false;
  isNormalAdmin = false;
  isNormalUser = false;

  englag = false
  isVideo = true

  constructor(
    // private router: Router,
    private dataSharingService: DataSharingService,
    public loginService: LoginService,
    private authService: AuthenticationService
    // private _LoginComponent: LoginComponent,
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
    loginService.username$.subscribe((username: string) => {
      this.username = username;
    });
    loginService.isInData$.subscribe((isInData: boolean) => {
      this.isInData = isInData;
    });
    loginService.Data$.subscribe((Data: string ) => {
      this.CatrgoresName = Data;
    });
    loginService.dataTag$.subscribe((tagname: string ) => {
      this.TagsName = tagname;
    });
    loginService.dataTagState$.subscribe(( tagnameState: boolean ) => {
      this.TagsNameState = tagnameState;
    });
    this.loginService.adminclock$.subscribe((adminclock: boolean) => {
      this.adminclock = adminclock;
    });
    this.loginService.iseng$.subscribe((iseng: boolean) => {
      this.englag = iseng;
    });
    this.loginService.isVideo$.subscribe((isVideo: boolean) => {
      this.isVideo = isVideo;
    });

    
  }
  
  gettoggleclass()
  {
    if (!this.englag) {
      return "UserToggel";
    }
    else{
      return "UserToggel2";

    }
  }
  getbarclass()
  {
    if (!this.englag) {
      return "container";
    }
    else{
      return "container flex-row-reverse";

    }
  }
  getUserplace()
  {
    if (!this.englag) {
      return "username";
    }
    else{
      return "username2";

    }

  }
  ngOnInit(): void {
    this.CatrgoresName =``
    this.TagsName = ``
    this.isInData = false
    this.authService.userRoles$.subscribe((roles) => {
      // // console.log(roles);
      
      this.isSuperAdmin = roles.includes('SuperAdmin');
      this.isNormalAdmin = roles.includes('Admin');
      this.isNormalUser = roles.includes('User');
    });
  }
  adminclick(){
    this.loginService.isadminclicked( true )

  }
  
  onUserToggle()
  {
    if (this.isLoggedIn && !this.isUserIcons) {
      this.isUserIcons = true
    }
    else  if (this.isLoggedIn && this.isUserIcons) {
      this.isUserIcons = false
    }
  }



  logout(): void {
    // this.loginForm.reset()
    this.loginService.logout();
    // window.location.reload();
  }

  onUserClickedCat()
  {
    if (this.isInData) {
      this.TagsName = ``
      this.isInData = false
      this.TagsNameState = false
    }


  }
  onUserClickedTag()
  {
    this.TagsNameState = false
  }
  onUserClickTags()
  {
    if (this.isInData) {
      this.onUserClickedCat()
      this.CatrgoresName = ``
    }
  }
  onAdminClickVideo()
  {
    this.loginService.isInVideoChange(true)

  }

}
