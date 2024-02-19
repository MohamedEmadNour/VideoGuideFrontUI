import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneListService } from '../phone-list.service';
import { DataSharingService } from '../data-sharing.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { LoginService } from '../login-servic.service';


@Component({
  selector: 'app-filter-tags',
  templateUrl: './filter-tags.component.html',
  styleUrls: ['./filter-tags.component.css']
})
export class FilterTagsComponent {
  UserClick = undefined
  CatrgoresName: any;
  GroupID : any
  tags : any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private phoneListService: PhoneListService,
    private dataSharingService: DataSharingService,
    // public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private loginService: LoginService,

    
    // public viewComponent: ViewComponent,

  ) {
    loginService.Data$.subscribe((Data: string ) => {
      this.CatrgoresName = Data;
    });
    this.GroupID = localStorage.getItem('GroupID')

  }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginService.Data$.subscribe((Data: string ) => {
      this.CatrgoresName = Data;
    });
    this.GetTag(this.GroupID)
  }

  GetTag(GroupID : any)
  {
    this.phoneListService.getTagsOfCategory(GroupID).subscribe({
      next: (data: any) => {
        // // console.log(data);
        this.tags = data
        
        // this.phoneListData = data;
        // // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
    // // console.log(GroupID);
    
  }


  ValueUserChose(userClick : string , TagID : any )
  {
    this.loginService.isInDataChange( true )
    this.loginService.isInTagValue( userClick )
    localStorage.setItem( 'TagID' , TagID )
    // // console.log(userClick);
    
    // this.dataSharingService.setsharedDataCategory(UserClick);
  }

}
