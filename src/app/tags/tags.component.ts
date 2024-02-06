import { Component, OnInit, ElementRef, AfterViewInit , OnDestroy  } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PhoneListService } from '../phone-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login-servic.service';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { GlobalClickService } from '../global-click.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {



  TagForm: FormGroup;

  selectedFile: File | undefined;
  TagOptions : any ;
  selectedTag : any ;
  selectedTagCase : boolean = false
  TagID : any ;
  GroupID : any ;







  GroupOptions : any ;
  selectedGroup : any ;


  isInData = false;
  edittags : boolean = false
  addtags : boolean = false
  Assigntags : boolean = false

  


  isSuperAdmin = false;
  isNormalAdmin = false;
  isNormalUser = false;


  constructor(
    private loginService: LoginService,
     private el: ElementRef,
     private fb: FormBuilder,
    private dataSharingService: DataSharingService,
    private router:Router ,
    private phoneListService: PhoneListService,
    private authService: AuthenticationService,
    private globalClickService: GlobalClickService



    ) {
    loginService.isInData$.subscribe((isInData: boolean) => {
      this.isInData = isInData;
    });
    this.loginService.adminclock$.subscribe((adminclock: boolean) => {
      this.isNormalAdmin = adminclock;
      this.addtags = false
      this.edittags = false
      this.Assigntags = false
    });
    this.TagForm = this.fb.group({

      TagID: [''],
      visable: [''],
      GroupID: [''],
      Lantin_TagName: ['', Validators.required],
      Local_TagName: ['', Validators.required],
      Tag_Photo_Location: [''],
      Image: [''],
    });
  }

  ngOnInit(): void {
    this.addtags = false
    this.edittags = false
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginService.isInData$.subscribe((isInData: boolean) => {
      this.isInData = isInData;
    });
    this.loginService.adminclock$.subscribe((adminclock: boolean) => {
      this.isNormalAdmin = adminclock;
    });

    this.authService.userRoles$.subscribe((roles) => {
      // console.log(roles);
      
      this.isSuperAdmin = roles.includes('SuperAdmin');
      this.isNormalAdmin = roles.includes('Admin');
      this.isNormalUser = roles.includes('User');
    });

    if (this.isNormalAdmin ) {
      this.fetchGroups()
    }

  }


  fetchGroups() {
    // this.loadingState = 'loading';

    this.phoneListService.getAllTags().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.TagOptions = data
        
        // this.phoneListData = data;
        // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
    this.phoneListService.getAllGroups().subscribe({
      next: (dataGroup: any) => {
        // console.log(data);
        this.GroupOptions = dataGroup
        
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

    
  }

  onTagChange(selectedTag : any){
    // console.log(selectedTag);
    this.selectedTagCase = true
    if (typeof selectedTag === 'string') {
      const selectedTagData = this.TagOptions.find((Tag: { Lantin_TagName: string; }) =>
        Tag.Lantin_TagName.trim() === selectedTag.trim()
    );
        // console.log(selectedTagData);
  
        this.TagID = selectedTagData?.TagID
        this.selectedTag = selectedTagData
        // console.log(this.GroupID);
        // console.log(this.selectedGroup);
        // console.log(selectedGroupData);
    }
    
  }

  onSubmit() {
    if (this.edittags) {
      const formData = new FormData();

      formData.append('TagID', this.TagID);
      formData.append('visable', this.TagForm.value.visable.$ngOptionLabel); // Ensure this value is correct
      formData.append('Tag_Photo_Location', this.TagForm.value.Tag_Photo_Location);
      formData.append('Lantin_TagName', this.TagForm.value.Lantin_TagName);
      formData.append('Local_TagName', this.TagForm.value.Local_GroupName);
    
      if (this.selectedFile) {
        formData.append('Image', this.selectedFile, this.selectedFile.name);
      }
      const headers = new HttpHeaders({
        Accept : '*/*',
      });
    
      this.phoneListService.EditTag(formData, headers).subscribe({
        next: (response: any) => {
          this.LoginShowPopup('Edit Tag Successful');
          this.TagForm.reset();
          this.selectedTagCase = false
          // console.log(response);
        },
        error: (error: any) => {
          this.LoginShowPopup('Edit Tag Failed');
          // console.log(error);
          // console.log(formData);
          // console.log(this.registrationForm.value.visable.$ngOptionLabel);
        }
      }); 
    }
    if (this.addtags) {
      if (this.selectedFile) {


        const formData = new FormData();
    
        formData.append('Lantin_TagName', this.TagForm.value.Lantin_TagName);
        formData.append('Local_TagName', this.TagForm.value.Local_TagName);
        formData.append('Image', this.selectedFile, this.selectedFile.name);
        // formData.append('listGroupID', this.GroupID);
        for (let i = 0; i < this.GroupID.length; i++) {
          formData.append('listGroupID', (this.GroupID[i].toString()));
        }
    
        const headers = new HttpHeaders({
          Accept: '*/*',
        });
    
        this.phoneListService.AddTag(formData, headers).subscribe({
          next: (response: any) => {
            this.LoginShowPopup('Add Tag Successful');
            this.TagForm.reset();
            this.selectedTagCase = false;
            console.log(response);
          },
          error: (error: any) => {
            this.LoginShowPopup('Add Tag Failed');
            console.log(error);
            console.log(formData);
            console.log(this.TagForm.value);
          }
        });
      }
    }
    if (this.Assigntags) {
      this.TagForm = this.fb.group({
        TagID: [[]], 
        GroupID: [[]],
      });
      const listTagID = this.TagForm.value.TagID.map((tagID: number) => ({ tagID }));
      const listGroupID = this.TagForm.value.GroupID.map((groupID: number) => ({ groupID }));

      const payload = {
        listGroupID,
        listTagID,
      };

      this.phoneListService.AssignTagsToGroup(payload).subscribe({
        next: (response: any) => {
          this.LoginShowPopup('Tags Assign To Group Successful');
          this.TagForm.reset();
          this.selectedTagCase = false;
          // console.log(response);
        },
        error: (error: any) => {
          this.LoginShowPopup('Tags Assign To Group Failed');
          // console.log(error);
          // console.log(payload);
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


  Array_FormTags = [
    {
      id : 1,
      label_Content : 'Add Tag',
      ngif : `this.isNormalAdmin` ,
    },
    {
      id : 2,
      label_Content : 'Edit Tag',
      ngif : `this.isNormalAdmin`,
    },
    {
      id : 3,
      label_Content : 'Assign Tags To Group',
      ngif : `this.isNormalAdmin`,
    },
  ]

  tagsclick( tagid : number)
  {
    if (tagid == 1 ) {
      // console.log(`addtags`);
      this.addtags = true
      this.edittags = false
      this.isNormalAdmin = false
      this.Assigntags = false
      return;
      
    }
    if (tagid == 2) {
      // console.log(`edittags`);
      this.edittags = true
      this.addtags = false
      this.Assigntags = false
      this.isNormalAdmin = false
      this.fetchGroups()
      return
    }    if (tagid == 3) {
      // console.log(`edittags`);
      this.Assigntags = true
      this.edittags = false
      this.addtags = false
      this.isNormalAdmin = false
      this.fetchGroups()
      return
    }
     
  }
  onGroupChange(selectedGroup: any) {
    if (typeof selectedGroup === 'string' || selectedGroup instanceof String) {
      // Handle single selection
      const selectedGroupName = Array.isArray(selectedGroup) ? selectedGroup[0] : selectedGroup;
      const selectedGroupData = this.GroupOptions.find((Group: { Lantin_GroupName: string }) =>
        Group.Lantin_GroupName.trim() === selectedGroupName.trim()
      );
  
      if (selectedGroupData) {
        this.GroupID = [Number(selectedGroupData.GroupID)]; // Wrap single ID in an array
        this.selectedGroup = selectedGroupData;
      }
    } else if (Array.isArray(selectedGroup)) {
      // Handle multiple selections
      this.GroupID = selectedGroup.map(group => {
        const selectedGroupData = this.GroupOptions.find((Group: { Lantin_GroupName: string }) =>
          Group.Lantin_GroupName.trim() === group.trim()
        );
        return selectedGroupData ? Number(selectedGroupData.GroupID) : null;
      }).filter(id => id !== null);
  
      // Ensure this.GroupID is an array with each index corresponding to the group ID value
      const tempArray = [];
      for (let i = 0; i < this.GroupID.length; i++) {
        tempArray[i] = this.GroupID[i];
      }
      this.GroupID = tempArray;
      console.log(this.GroupID);
    }
  }
  
  // addTheIdToList(GroupID : any){
  //   console.log(GroupID);
    
  //   if (this.addtags) {
  //     if (Array.isArray(this.TagForm.value)) {
  //       this.listGroupID.push(...GroupID);
  //       console.log(GroupID);

  //     } else {
  //       this.listGroupID.push(GroupID);
  //     }
  //   }
  // }

  
}
