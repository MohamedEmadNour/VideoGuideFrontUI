import { Component } from '@angular/core';
import { LoginService } from '../login-servic.service';
import { PhoneListService } from '../phone-list.service';
import { DataSharingService } from '../data-sharing.service';



@Component({
  selector: 'app-video-show',
  templateUrl: './video-show.component.html',
  styleUrls: ['./video-show.component.css']
})
export class VideoShowComponent {

  VideoUrl : any
  VideoName : any
  VideoID : any
  UserID : any
  fav : any
  vidFav : boolean = false ;

  sharedArray: string[] = [];

  constructor(
    private PhoneListService : PhoneListService ,
    private loginService : LoginService ,
    private dataSharingService: DataSharingService,


  )
  {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dataSharingService.sharedArray$.subscribe(data => {
      this.sharedArray = data; // Update the local array in Component B
      // console.log(this.sharedArray);
    });

    this.VideoUrl = this.sharedArray[0]
    this.VideoName = this.sharedArray[1]
    this.VideoID = this.sharedArray[2]
    this.UserID = localStorage.getItem('User ID')
    this.fav = this.sharedArray[3]
    // console.log(this.fav);
    // console.log(this.sharedArray);
    
    if (this.fav) {
      this.vidFav = true
    }
    else{
      this.vidFav = false
    }
    this.UpViewForVideo(this.VideoID)
  }


  UpViewForVideo( VideoID : any )
  {
    // console.log(VideoID);
    
    this.PhoneListService.UpViewForVideo(VideoID).subscribe({
      next: (response: any) => {


      },
    });
  }

openAddingFav(VideoID: number, id: any): void {
    this.PhoneListService.AddingFav(VideoID, id).subscribe({
      next: (response: any) => {
        // console.log(VideoID , id );
        // console.log(response);
        if (this.vidFav) {
          this.LoginShowPopup("Video Removed From Favorite Succ" , ` #00cc6d52 `)
        }
        else {
          this.LoginShowPopup("Video Add To Favorite Succ" , ` #00cc6d52 `)
        }

        this.loginService.IsFavForateChanged(true);
        // Notify that the favorite status has changed

      },
      error: (error: any) => {
        console.log(error);
        // Handle error
      }
    });
 
}

LoginShowPopup(x: string , color : string ): void {
  const y = `top: 45%; right: 50%; color: White; `;
  const popup = document.getElementById('popup');
  if (popup) {
    popup.innerHTML = x;
    popup.style.cssText = y;
    popup.style.backgroundColor = color ;
    popup.style.display = 'block';

    setTimeout(() => {
      if (popup) {
        popup.style.display = 'none';
      }
    }, 3500);
  }
}
}
