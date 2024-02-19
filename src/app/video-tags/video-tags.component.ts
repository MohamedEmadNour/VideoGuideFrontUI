import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneListService } from '../phone-list.service';
import { DataSharingService } from '../data-sharing.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login-servic.service';
import { LocalizedString } from '@angular/compiler';

@Component({
  selector: 'app-video-tags',
  templateUrl: './video-tags.component.html',
  styleUrls: ['./video-tags.component.css']
})
export class VideoTagsComponent {

  UserClick = undefined
  nothing = undefined
  TagsName: any;
  TagID : any
  Videos : any;
  UserId : any;

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
    loginService.dataTag$.subscribe((tagname: string ) => {
      this.TagsName = tagname;
    });
    this.TagID = localStorage.getItem('TagID')
    this.UserId = localStorage.getItem('User ID')

  }
  ngOnInit(): void {
    this.loginService.dataTag$.subscribe((tagname: string ) => {
      this.TagsName = tagname;
    });
    this.GetVideos(this.TagID)
    
  }

  GetVideos(TagID : any)
  {
    this.phoneListService.getVideosOfTags(TagID ,this.UserId ).subscribe({
      next: (data: any) => {
         // console.log(data);
        this.Videos = data
        
        // this.phoneListData = data;
        // // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
    // // console.log(TagID);
    
  }




  ValueUserChose( VideoUrl : any , VideoName : any , VideoID : any , fav : any , Description : any)
  {
    
      const newData = [VideoUrl, VideoName, VideoID , fav , Description]; // New array data
      this.dataSharingService.updateSharedArray(newData);
    
    this.loginService.isInTagChange( true )

    
    this.loginService.isInDataChange( true )
    // this.dataSharingService.setsharedDataCategory(UserClick);
  }



}
