import { Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../login-servic.service';
import { PhoneListService } from '../phone-list.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  itarbs: boolean = false

  searchValue: string | number  = '';
  Array_FormVid : any ;

  AllVideos : any 
  constructor(
    private router:Router,
    public  loginService: LoginService,
    private phoneListService: PhoneListService,



  )
  {
    this.loginService.iseng$.subscribe((iseng: boolean) => {
      this.itarbs = iseng;
    });

    
  }
  ngOnInit(): void {
 
    this.Array_FormVid = this.AllVideos
    // console.log(this.Array_FormVid);
    
  }

  GetAllVideos( VideoSearch : string | number )
  {
    this.phoneListService.getSearchVideo(VideoSearch).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.AllVideos = data
        this.Array_FormVid = this.AllVideos
        
        // this.phoneListData = data;
        // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });

  }
  

  onSearchInputChange(event: Event)
  {

    if (this.searchValue != "") {

      
      const inputValue = (event.target as HTMLInputElement).value;
      this.searchValue = inputValue;
      this.GetAllVideos(this.searchValue)
      // if (!this.itarbs) {
      //   const filtered = this.AllVideos.filter((item : any) => 
      //   item.Video_Lantin_Description.toLowerCase().includes(inputValue.toString().toLowerCase())
      //   );
      //   const filteredname = this.AllVideos.filter((item : any) => 
      //   item.Video_Lantin_Title.toLowerCase().includes(inputValue.toString().toLowerCase())
      //   );
      //   this.Array_FormVid = [...filtered , ...filteredname ]  // [...filteredByNum, ...filteredByName]
      // } else {
      //   const filtered = this.AllVideos.filter((item : any) => 
      //   item.Video_Local_Description.toLowerCase().includes(inputValue.toString().toLowerCase())
      //   );
      //   const filteredname = this.AllVideos.filter((item : any) => 
      //   item.Video_Local_Tiltle.toLowerCase().includes(inputValue.toString().toLowerCase())
      //   );
      //   this.Array_FormVid = [...filtered , ...filteredname ] 
      // }

    }
    else (
      this.cancelSearch()
    )
  }

  cancelSearch()
  {
    if ( this.searchValue != "") {
      this.searchValue = ''; 
    }
    this.Array_FormVid = []
  }

  ValueUserChose( VideoUrl : any , VideoName : any ,  VideoID : any ) 
  {
    this.router.navigate(['/search/video']);
    localStorage.setItem( 'VideoUrl' , VideoUrl )
    localStorage.setItem( 'VideoName' , VideoName )
    localStorage.setItem( 'VideoID' , VideoID )

    
  }

  getcancelvalue()
  {
    if (!this.itarbs) {
      return `Cancel`
    }
    else{
      return `إلفاء`
    }
  }


}
