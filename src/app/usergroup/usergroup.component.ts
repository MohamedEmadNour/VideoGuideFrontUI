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
      listUserID : ['', Validators.required],
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
        // // console.log(data);
        this.useroptions = data
        
        // this.phoneListData = data;
        // // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
    this.phoneListService.getAllGroups().subscribe({
      next: (data: any) => {
        // // console.log(data);
        this.groupoptions = data
        
        // this.phoneListData = data;
        // // console.log(this.phoneListData);
      
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
    // Check if UserID array is empty
    if (this.UserID.length === 0) {
      // Display an error message or handle the case where no user IDs are selected
      return;
    }
  
    // Construct request data
    const requestData = {
      listGroupID: this.groupID.map((groupID: number) => ({ groupID })),
      listUserID: this.UserID.map((id: string) => ({ id }))
    };
    // // console.log(requestData);
    
    // Send request to backend
    this.phoneListService.usertogroup(requestData).subscribe({
      next: (response: any) => {
        // Handle successful response
        this.LoginShowPopup('Add Group Successful');
        this.formData.reset();
        // // console.log(response);
      },
      error: (error: any) => {
        // Handle error response
        if (error.status === 404) {
          // Display error message or handle the case where user is not found
          // console.error('User not found:', error.error.message);
        } else {
          // Display general error message or handle other types of errors
          this.LoginShowPopup('Add Group Failed');
          // console.error('Error:', error);
        }
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
  // onUserChange(selectedUser : any){
  //   // // console.log(selectedUser);
  //   // this.selectedUserCase = true
  //   if (typeof selectedUser === 'string') {
  //       const selectedUserData = this.useroptions.find((User: { FullName: string; }) =>
  //       User.FullName.trim() === selectedUser.trim()
  //       );
  //       // // console.log(selectedUserData);
  
  //       this.UserID = selectedUserData?.Id
  //       this.selectedUser = selectedUserData
  //       // // console.log(this.GroupID);
  //       // // console.log(this.selectedGroup);
  //       // // console.log(selectedUserData);
  //     }

    
  // }
  onUserChange(selectedUser: any) {
    if (typeof selectedUser === 'string' || selectedUser instanceof String) {
      // Handle single selection
      const selectedUserName = Array.isArray(selectedUser) ? selectedUser[0] : selectedUser;
      const selectedUserData = this.useroptions.find((User: { FullName: string }) =>
        User.FullName.trim() === selectedUserName.trim()
      );
      // // console.log(this.UserID);
        
      // // console.log(selectedUserData);
      if (selectedUserData) {
        // Assuming 'Id' is the correct property name for the user ID
        this.UserID = [selectedUserData.Id]; // Wrap single ID in an array
        this.selectedUser = selectedUserData;
        // // console.log(this.UserID);
        
        // // console.log(selectedUserData);
      }
    } else if (Array.isArray(selectedUser)) {
      // Handle multiple selections
      this.UserID = selectedUser.map(user => {
        const selectedUserData = this.useroptions.find((User: { FullName: string }) =>
          User.FullName.trim() === user.trim()
        );
        
        // // console.log(selectedUserData);
        
        return selectedUserData ? selectedUserData.Id : null;
      }).filter(id => id !== null);
      // // console.log(this.UserID);

    }
  }
  
  // onGroupChange(selectedgroup : any){
  //   // // console.log(selectedgroup);
  //   // this.selectedgroupCase = true
  //   if (typeof selectedgroup === 'string') {
  //     const selectedgroupData = this.groupoptions.find((group: { Lantin_GroupName: string; }) =>
  //       group.Lantin_GroupName.trim() === selectedgroup.trim()
  //       );
  //       // // console.log(selectedgroupData);
  
  //       this.groupID = selectedgroupData?.GroupID
  //       this.selectedgroup = selectedgroupData
  //       // // console.log(this.GroupID);
  //       // // console.log(this.selectedGroup);
  //       // // console.log(selectedgroupData);
  //   }
    
  // }
  onGroupChange(selectedGroup: any) {
    // console.log(selectedGroup);
    
    if (typeof selectedGroup === 'string' || selectedGroup instanceof String) {
      // Handle single selection
      const selectedGroupName = Array.isArray(selectedGroup) ? selectedGroup[0] : selectedGroup;
      const selectedGroupData = this.groupoptions.find((Group: { Lantin_GroupName: string }) =>
        Group.Lantin_GroupName.trim() === selectedGroupName.trim()
      );
    // console.log(selectedGroupData);
      
      if (selectedGroupData) {
        this.groupID = [Number(selectedGroupData.GroupID)]; 
        this.selectedgroup = selectedGroupData;
      }
    } 
    else if (Array.isArray(selectedGroup)) {
//  // console.log("arr");
 
      this.groupID = selectedGroup.map(group => {
        const selectedGroupData = this.groupoptions.find((Group: { Lantin_GroupName: string }) =>
          Group.Lantin_GroupName.trim() === group.trim()
          
          );
          // // console.log(selectedGroupData);
        return selectedGroupData ? Number(selectedGroupData.GroupID) : null;
      }).filter(id => id !== null);
      
  

      const tempArray = [];
      for (let i = 0; i < this.groupID.length; i++) {
        tempArray[i] = this.groupID[i];
      }
      this.groupID = tempArray;
      // console.log(this.groupID);
    }
  }

}
