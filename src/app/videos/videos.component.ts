import { Component , OnInit } from '@angular/core';
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
  selectedFile: File | undefined | null;
  addVideo : boolean = false
  updateVideo : boolean = false
  TagOptions : any ;
  selectedTag : any ;
  TagID : any ;

  VideoOptions : any ;
  selectedVideo : any ;
  selectedVideoCase : boolean = false
  VideoID : any ;

  LoadingScreen : boolean = false
  selectedTagName:  string[] = [];



  itarbs: boolean = false
  isVideo: boolean = true


  constructor(
    private fb: FormBuilder,
    private phoneListService: PhoneListService ,
    private loginService : LoginService
    ) {
    this.registrationForm = this.fb.group({
      VideoID : ['', Validators.required],
      TagID : [[]],
      Video_Location : ['', Validators.required],
      Video_Lantin_Title : ['', Validators.required],
      Video_Local_Tiltle : ['', Validators.required],
      Video_Lantin_Description  : ['', Validators.required],
      Video_Local_Description  : ['', Validators.required],
      Video : ['', Validators.required],
      visable : ['', Validators.required],
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
        // // console.log(data);
        this.VideoOptions = data
        
        // this.phoneListData = data;
        // // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
    this.phoneListService.getAllTags().subscribe({
      next: (data: any) => {
        // // console.log(data);
        this.TagOptions = data
        
        // this.phoneListData = data;
        // // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      // // console.log(event);
    }
  }
  
  
  onSubmit() {

    if (this.addVideo) {
      if (this.selectedFile) {
        this.LoadingScreen = true
        const formData = new FormData();
        formData.append('Video_Lantin_Title', this.registrationForm.value.Video_Lantin_Title);
        formData.append('Video_Local_Tiltle', this.registrationForm.value.Video_Local_Tiltle);
        formData.append('Video_Lantin_Description', this.registrationForm.value.Video_Lantin_Description);
        formData.append('Video_Local_Description', this.registrationForm.value.Video_Local_Description);
        formData.append('Video', this.selectedFile, this.selectedFile.name);
        for (let i = 0; i < this.TagID.length; i++) {
          formData.append(`listTagID[${i}]`, this.TagID[i].toString());
        }

        
        // console.log(formData);
        
        this.phoneListService.AddVideo(formData).subscribe({
          next: (response: any) => {
            this.LoginShowPopup('Add Video Successful');
            this.registrationForm.reset();
            // console.log(response);
            this.LoadingScreen = false
            this.ngOnInit()
            formData.delete("Video");
            const fileInput = document.getElementById('Video') as HTMLInputElement;
            fileInput.value = '';
            
          },
          error: (error: any) => {
            this.LoginShowPopup('Add Video Failed');
            // // console.log(error);
            this.LoadingScreen = false

  
          }
        });
      }
    }
    if (this.updateVideo) {
      this.LoadingScreen = true;
      const formData = new FormData();
      formData.append('VideoID', this.VideoID );
      formData.append('Video_Lantin_Title', this.registrationForm.value.Video_Lantin_Title);
      formData.append('Video_Local_Tiltle', this.registrationForm.value.Video_Local_Tiltle);
      formData.append('Video_Lantin_Description', this.registrationForm.value.Video_Lantin_Description);
      formData.append('Video_Local_Description', this.registrationForm.value.Video_Local_Description);
      formData.append('Video_Location', this.registrationForm.value.Video_Location);
      if (this.selectedFile) {
        formData.append('Video', this.selectedFile!, this.selectedFile!.name);
      } 
    

    
      formData.append('visable', this.registrationForm.value.visable); // Ensure this value is correct
      
      this.phoneListService.UpdateVideo(formData).subscribe({
        next: (response: any) => {
          this.LoginShowPopup('Add Video Successful');
          this.registrationForm.reset();
          this.LoadingScreen = false;
          this.ngOnInit();
          formData.delete("Video");
          const fileInput = document.getElementById('Video') as HTMLInputElement;
          fileInput.value = '';
          
        },
        error: (error: any) => {
          this.LoginShowPopup('Add Video Failed');
          // console.log(error);
          this.LoadingScreen = false;
        }
      });
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


  onVideoChange(selectedVideo: any) {
    if (selectedVideo) {
      this.selectedVideoCase = true;
    
      const selectedVideoData = this.VideoOptions.find((video: { Video_Lantin_Title: string }) =>
        video.Video_Lantin_Title.trim() === selectedVideo.trim()
      );
      
      if (selectedVideoData) {
        this.VideoID = selectedVideoData.VideoID;
        this.selectedVideo = selectedVideoData;
        // Assuming GetVideoTagDTO contains an array of tags associated with the video
        this.selectedTagName = selectedVideoData.GetVideoTagDTO.map((tag: { Lantin_TagName: string }) => tag.Lantin_TagName);
      }
    }

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

  onTagChange(selectedTag: any) {
    if (typeof selectedTag === 'string' || selectedTag instanceof String) {
      // Handle single selection
      const selectedTagName = Array.isArray(selectedTag) ? selectedTag[0] : selectedTag;
      const selectedTagData = this.TagOptions.find((Tag: { Lantin_TagName: string }) =>
        Tag.Lantin_TagName.trim() === selectedTagName.trim()
      );
  
      if (selectedTagData) {
        this.TagID = [Number(selectedTagData.TagID)]; // Wrap single ID in an array
        this.selectedTag = selectedTagData;
      }
    } else if (Array.isArray(selectedTag)) {
      // Handle multiple selections
      this.TagID = selectedTag.map(tag => {
        const selectedTagData = this.TagOptions.find((Tag: { Lantin_TagName: string }) =>
          Tag.Lantin_TagName.trim() === tag.trim()
        );
        return selectedTagData ? Number(selectedTagData.TagID) : null;
      }).filter(id => id !== null);
  
      // Ensure this.TagID is an array with each index corresponding to the tag ID value
      const tempArray = [];
      for (let i = 0; i < this.TagID.length; i++) {
        tempArray[i] = this.TagID[i];
      }
      this.TagID = tempArray;
      // console.log(this.TagID);
      
    }  
  }
  
  
  
  
}
