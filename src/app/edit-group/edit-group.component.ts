import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneListService } from '../phone-list.service';
import { Group } from 'paper/dist/paper-core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent {
  registrationForm: FormGroup;
  selectedFile: File | undefined;
  GroupOptions : any ;
  selectedGroup : any ;
  selectedGroupCase : boolean = false
  GroupID : any ;

  constructor(private fb: FormBuilder, private phoneListService: PhoneListService) {
    this.registrationForm = this.fb.group({

      GroupID: ['', Validators.required],
      visable: ['', Validators.required],
      Lantin_GroupName: ['', Validators.required],
      Local_GroupName: ['', Validators.required],
      Group_Photo_Location: ['', Validators.required],
      Image: [''],
      listId: [''],
    });
  }

  ngOnInit(): void {

    this.fetchGroups()
  }

  fetchGroups() {
    // this.loadingState = 'loading';

    this.phoneListService.getAllGroups().subscribe({
      next: (data: any) => {
        // // console.log(data);
        this.GroupOptions = data
        
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
    
    this.selectedFile = event.target.files[0];
    // // console.log(event);
    
  }
  
  onSubmit() {
    const formData = new FormData();
    formData.append('GroupID', this.GroupID);
    formData.append('visable', this.registrationForm.value.visable); // Ensure this value is correct
    formData.append('Group_Photo_Location', this.registrationForm.value.Group_Photo_Location);
    formData.append('Lantin_GroupName', this.registrationForm.value.Lantin_GroupName);
    formData.append('Local_GroupName', this.registrationForm.value.Local_GroupName);
    formData.append('listId', this.registrationForm.value.listId || ''); // Ensure to handle empty values
  
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }
    const headers = new HttpHeaders({
      Accept : '*/*',
    });
  
    this.phoneListService.EditGroup(formData, headers).subscribe({
      next: (response: any) => {
        this.LoginShowPopup('Add Group Successful');
        this.registrationForm.reset();
        this.selectedGroupCase = false
        // // console.log(response);
      },
      error: (error: any) => {
        this.LoginShowPopup('Add Group Failed');
        // // console.log(error);
        // // console.log(formData);
        // // console.log(this.registrationForm.value.visable.$ngOptionLabel);
      }
    });
    
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


  onGroupChange(selectedGroup : any){
    // // console.log(selectedGroup);
    // console.log(this.registrationForm)

    this.selectedGroupCase = true
    if (selectedGroup) {
      const selectedGroupData = this.GroupOptions.find((Group: { Lantin_GroupName: string; }) =>
      Group.Lantin_GroupName.trim() === selectedGroup.trim()
      );
      // // console.log(selectedGroupData);

      this.GroupID = selectedGroupData?.GroupID
      this.selectedGroup = selectedGroupData
      // // console.log(this.GroupID);
      // // console.log(this.selectedGroup);
      // // console.log(selectedGroupData);
    
    }

  }
}
