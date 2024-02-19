import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PhoneListService } from '../phone-list.service';
import { LoginService } from '../login-servic.service';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';


@Component({
  selector: 'app-catrgores',
  templateUrl: './catrgores.component.html',
  styleUrls: ['./catrgores.component.css']
})
export class CatrgoresComponent {
  isInData = false;
  nothing = undefined
  Grups : any ;
  Images = ``

  isSuperAdmin = false;
  isNormalAdmin = false;
  isNormalUser = false;
  itarbs: boolean = false

  constructor(
    private loginService: LoginService,
     private el: ElementRef,
    private dataSharingService: DataSharingService,
    private router:Router ,
    private phoneListService: PhoneListService,
    private authService: AuthenticationService,



    ) {
    loginService.isInData$.subscribe((isInData: boolean) => {
      this.isInData = isInData;
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginService.isInData$.subscribe((isInData: boolean) => {
      this.isInData = isInData;
    });
    this.loginService.iseng$.subscribe((iseng: boolean) => {
      this.itarbs = iseng;
    })

    this.authService.userRoles$.subscribe((roles) => {
      // // console.log(roles);
      
      this.isSuperAdmin = roles.includes('SuperAdmin');
      this.isNormalAdmin = roles.includes('Admin');
      this.isNormalUser = roles.includes('User');
    });

    if (this.isNormalUser ) {
      this.fetchGroups()
    }

  }


  ValueUserChose(UserClick : any , GroupID : any)
  {
    this.loginService.isInDataChange( false )
    this.loginService.isInCategroeValue( UserClick )
    this.dataSharingService.setsharedDataCategory(UserClick);
    localStorage.setItem( 'GroupID' , GroupID )
  }

  convertBinaryToBase64(binaryData: ArrayBuffer): void {
    // Convert ArrayBuffer to Base64
    const blob = new Blob([new Uint8Array(binaryData)]);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      this.Images = event.target?.result as string;
    };

    reader.readAsDataURL(blob);
  }

  fetchGroups() {
    // this.loadingState = 'loading';

    this.phoneListService.getAllGroups().subscribe({
      next: (data: any) => {
        // // console.log(data);
        this.Grups = data
        
        // this.phoneListData = data;
        // // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
  }


  



  Array_FormGroup = [
    {
      label_Content : 'Add Group',
      label_Contentar : 'اضافه مجموعه',
      ngif : `this.isNormalAdmin` ,
      routerLink : `/catrgores/AddGroup`,
    },
    {
      label_Contentar : 'تعديل مجموعه',
      label_Content : 'Edit Group',
      ngif : `this.isNormalAdmin` ,
      routerLink : `/catrgores/EditGroup`,
    },
  ]


}
