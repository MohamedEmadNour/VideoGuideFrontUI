import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneListService } from '../phone-list.service';
import { AuthenticationService } from '../authentication.service'


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],

})
export class RegistrationComponent {
  registrationForm: FormGroup;

  isSuperAdmin = false;
  isNormalAdmin = false;
  isNormalUser = false;

  GroupOptions : any ;
  selectedGroup : any ;
  GroupID : any ;
  Roles : any;

  constructor(
    private fb: FormBuilder,
     private phoneListService: PhoneListService ,
    private authService: AuthenticationService ,
     
     ) {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      password: [''],
      fullName: ['', Validators.required],
      roles: ['' , Validators.required],
      GroupID : this.GroupID

    });
  }
  ngOnInit(): void {
    this.authService.userRoles$.subscribe((roles) => {
      // console.log(roles);
      
      this.isSuperAdmin = roles.includes('SuperAdmin');
      this.isNormalAdmin = roles.includes('Admin');
      this.isNormalUser = roles.includes('User');

      // console.log(this.isSuperAdmin);
      // console.log(this.isNormalAdmin);
      
    });
    this.fetchGroups()


  }

  fetchGroups() {
    // this.loadingState = 'loading';

    this.phoneListService.getAllGroups().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.GroupOptions = data
        
        // this.phoneListData = data;
        // console.log(this.phoneListData);
      
      },
      error: () => {
        // console.error('Error fetching phone list data:', error);
        // this.loadingState = 'notLoading';
      },
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = {
        userName: this.registrationForm.get('userName')?.value,
        password: this.registrationForm.get('password')?.value,
        fullName: this.registrationForm.get('fullName')?.value,
        roles: this.Roles,
        listGroupID: this.GroupID.map((groupID: number) => ({ groupID }))
      };
      this.phoneListService.register(userData).subscribe( {
       next:(response: any) => {
        console.log(response);
        // console.log(userData);
        
        this.LoginShowPopup("User Registration Suc" , ` #00cc6d52 `)
        this.registrationForm.reset()
        },
        error : (error: any) => {
        console.log(error);
        console.log(userData);

        this.LoginShowPopup("User Registration False " , ` #e616166e `)
          

        }
      })
  }
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
onRolesChange(selectedGroup: any){
  if (selectedGroup && selectedGroup.length > 0) {
    this.Roles = selectedGroup.map((item: any) => item.$ngOptionLabel.trim());
    // console.log(this.Roles);
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
    // console.log(this.GroupID);
  }
}


}
