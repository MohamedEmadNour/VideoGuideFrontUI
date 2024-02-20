import { Component } from '@angular/core';
import { PhoneListService } from '../phone-list.service';
import { LoginService } from '../login-servic.service';
import { DataSharingService } from '../data-sharing.service';





@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  change: boolean = false;
  userID:any ;
  Videos : any ;


  constructor(
    private phoneListService : PhoneListService ,
    private loginService : LoginService ,
    private DataSharingService : DataSharingService ,
  )
  {
    this.userID = localStorage.getItem('User ID')
    this.loginService.IsFavChange$.subscribe((change: boolean) => {
      this.change = change;
      // Call the function to get all favorite videos for the user
      this.GetAllfavVideos(this.userID);
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.GetAllfavVideos(this.userID)
    this.loginService.IsFavChange$.subscribe((change: boolean) => {
      this.change = change;
      // Call the function to get all favorite videos for the user
      this.GetAllfavVideos(this.userID);
    });
  }

  GetAllfavVideos( UserID : any )
  {
    this.phoneListService.getFavVideo(UserID).subscribe({
      next: (data: any) => {
        this.Videos = data
        // // console.log(data);
        
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

  ValueUserChose( VideoUrl : any , VideoName : any , VideoID : any )
  {
    const fav = true
    const newData = [VideoUrl, VideoName, VideoID , fav ]; // New array data
    this.DataSharingService.updateSharedArray(newData);

  }



}
