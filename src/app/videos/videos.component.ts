import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneListService } from '../phone-list.service';
import { LoginService } from '../login-servic.service';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
  
  registrationForm: FormGroup;
  selectedFile: File | undefined;
  addVideo : boolean = false
  updateVideo : boolean = false

  VideoOptions : any ;
  selectedVideo : any ;
  selectedVideoCase : boolean = false
  VideoID : any ;


  itarbs: boolean = false
  isVideo: boolean = true


  constructor(
    private fb: FormBuilder,
    private phoneListService: PhoneListService ,
    private loginService : LoginService
    ) {
    this.registrationForm = this.fb.group({
      VideoID : ['', Validators.required],
      Video_Location : ['', Validators.required],
      Video_Lantin_Title : ['', Validators.required],
      Video_Local_Tiltle : ['', Validators.required],
      Video_Lantin_Description  : ['', Validators.required],
      Video_Local_Description  : ['', Validators.required],
      Video : ['', Validators.required],
    });


  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchGroups()
    this.loginService.iseng$.subscribe((iseng: boolean) => {
      this.itarbs = iseng;
    })
    this.loginService.isVideo$.subscribe((isVideo: boolean) => {
      this.isVideo = isVideo;
      this.video()
    });
  }

  

  fetchGroups() {
    // this.loadingState = 'loading';

    this.phoneListService.getAllVideo().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.VideoOptions = data
        
        // this.phoneListData = data;
        // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    // console.log(event);
    
  }
  
  onSubmit() {
    if (this.addVideo) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('Video_Lantin_Title', this.registrationForm.value.Video_Lantin_Title);
        formData.append('Video_Local_Tiltle', this.registrationForm.value.Video_Local_Tiltle);
        formData.append('Video_Lantin_Description', this.registrationForm.value.Video_Lantin_Description);
        formData.append('Video_Local_Description', this.registrationForm.value.Video_Local_Description);
        formData.append('Video', this.selectedFile, this.selectedFile.name);
  
        this.phoneListService.AddVideo(formData).subscribe({
          next: (response: any) => {
            this.LoginShowPopup('Add Group Successful');
            this.registrationForm.reset();
            // console.log(response);
            
          },
          error: (error: any) => {
            this.LoginShowPopup('Add Group Failed');
            // console.log(error);
  
          }
        });
      }
    }
    if (this.updateVideo) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('VideoID', this.VideoID );
        formData.append('Video_Local_Tiltle', this.registrationForm.value.Video_Local_Tiltle);
        formData.append('Video_Lantin_Description', this.registrationForm.value.Video_Lantin_Description);
        formData.append('Video_Local_Description', this.registrationForm.value.Video_Local_Description);
        formData.append('Video_Location', this.registrationForm.value.Video_Location);
        formData.append('Video', this.selectedFile, this.selectedFile.name);
        formData.append('visable', this.registrationForm.value.visable.$ngOptionLabel); // Ensure this value is correct

  
        this.phoneListService.AddVideo(formData).subscribe({
          next: (response: any) => {
            this.LoginShowPopup('Add Group Successful');
            this.registrationForm.reset();
            // console.log(response);
            
          },
          error: (error: any) => {
            this.LoginShowPopup('Add Group Failed');
            // console.log(error);
  
          }
        });
      }
    }
  }

  LoginShowPopup(x: string): void {
    const y = 'top: 45%; right: 50%; color: White; ';
    const popup = document.getElementById('popup');
    if (popup) {
      popup.innerHTML = x;
      popup.style.cssText = y;
      popup.style.backgroundColor = ' #e616166e ';
      popup.style.display = 'block';

      setTimeout(() => {
        if (popup) {
          popup.style.display = 'none';
        }
      }, 1500);
    }
  }

  video()
  {
    if (this.isVideo) {
      this.addVideo = false
      this.updateVideo = false
    }
  }


  onVideoChange(selectedVideo : any){
    // console.log(selectedGroup);
    this.selectedVideoCase = true
    
    const selectedVideoData = this.VideoOptions.find((Video: { Video_Lantin_Title : string; }) =>
      Video.Video_Lantin_Title.trim() === selectedVideo.trim()
      );
      // console.log(selectedVideoData);

      this.VideoID = selectedVideoData?.VideoID
      this.selectedVideo = selectedVideoData
      // console.log(this.GroupID);
      // console.log(this.selectedGroup);
      // console.log(selectedGroupData);
    
  }

  AdminVideoHandeling( labelContent : string )
  {
    if (labelContent === 'Add Video') {
      this.addVideo = true
      this.loginService.isInVideoChange(false)
    }
    if (labelContent === 'Update Video') {
      this.updateVideo = true
      this.loginService.isInVideoChange(false)


    }

  }

  Array_FormGroup = [
    {
      label_Content : 'Add Video',
      label_Contentar : 'اضافه فيديو',

    },
    {
      label_Content : 'Update Video',
      label_Contentar : 'تعديل فيديو',

    },
  ]





  
}
