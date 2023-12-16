import { Component, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray ,  Validators } from '@angular/forms';
import { PhoneListService } from '../phone-list.service';


@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent {
  formData: FormGroup;
  useroptions : any ;
  selectedUserCase: any;
  UserID: any;
  selectedUser: any;

  groupoptions : any ;
  selectedgroupCase: any;
  groupID: any;
  selectedgroup: any;


  constructor(
    private formBuilder: FormBuilder,
    private phoneListService: PhoneListService,
    private router:Router 
  ) {
    this.formData = this.formBuilder.group({
      listId : ['', Validators.required],
      listGroupID : ['', Validators.required],
    });
  }


  ngOnInit(): void {


    // Add initial empty items (if needed)
    this.fetchGroups();
  }
  fetchGroups() {
    // this.loadingState = 'loading';

    this.phoneListService.getAllUser().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.useroptions = data
        
        // this.phoneListData = data;
        // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
    this.phoneListService.getAllGroups().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.groupoptions = data
        
        // this.phoneListData = data;
        // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
  }

  



  // Add a new item to listId


  // Handle form submission
  onSubmit(): void {

    
    const formdata = this.formBuilder.group({
      listId : [this.UserID, Validators.required],
      listGroupID : [this.groupID, Validators.required],
    });
    console.log(formdata.value);

    this.phoneListService.usertogroup(formdata.value).subscribe({
      next: (response: any) => {
        this.LoginShowPopup('Add Group Successful');
        this.formData.reset();
        // this.selectedGroupCase = false
        // console.log(response);
      },
      error: (error: any) => {
        this.LoginShowPopup('Add Group Failed');
        // console.log(error);
        // console.log(formData);
        // console.log(this.registrationForm.value.visable.$ngOptionLabel);
      }
    });

  }

  LoginShowPopup(x: string): void {
    const y = `top: 45%; right: 50%; color: White; `;
    const popup = document.getElementById('popup');
    if (popup) {
      popup.innerHTML = x;
      popup.style.cssText = y;
      popup.style.backgroundColor = ` #e616166e `;
      popup.style.display = 'block';
  
      setTimeout(() => {
        if (popup) {
          popup.style.display = 'none';
        }
      }, 1500);
    }
  }
  onUserChange(selectedUser : any){
    // console.log(selectedUser);
    // this.selectedUserCase = true
    if (typeof selectedUser === 'string') {
        const selectedUserData = this.useroptions.find((User: { FullName: string; }) =>
        User.FullName.trim() === selectedUser.trim()
        );
        // console.log(selectedUserData);
  
        this.UserID = selectedUserData?.Id
        this.selectedUser = selectedUserData
        // console.log(this.GroupID);
        // console.log(this.selectedGroup);
        // console.log(selectedUserData);
      }

    
  }
  onGroupChange(selectedgroup : any){
    // console.log(selectedgroup);
    // this.selectedgroupCase = true
    if (typeof selectedgroup === 'string') {
      const selectedgroupData = this.groupoptions.find((group: { Lantin_GroupName: string; }) =>
        group.Lantin_GroupName.trim() === selectedgroup.trim()
        );
        // console.log(selectedgroupData);
  
        this.groupID = selectedgroupData?.GroupID
        this.selectedgroup = selectedgroupData
        // console.log(this.GroupID);
        // console.log(this.selectedGroup);
        // console.log(selectedgroupData);
    }
    
  }

}
