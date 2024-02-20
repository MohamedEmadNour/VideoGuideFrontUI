import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneListService } from '../phone-list.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  registrationForm: FormGroup;
  selectedFile: File | undefined;

  constructor(private fb: FormBuilder, private phoneListService: PhoneListService) {
    this.registrationForm = this.fb.group({
      Lantin_GroupName: ['', Validators.required],
      Local_GroupName: ['', Validators.required],
      Image: ['', Validators.required],
      listId: [''],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    // console.log(event);
    
  }
  
  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('Lantin_GroupName', this.registrationForm.value.Lantin_GroupName);
      formData.append('Local_GroupName', this.registrationForm.value.Local_GroupName);
      formData.append('listId', this.registrationForm.value.listId);
      formData.append('Image', this.selectedFile, this.selectedFile.name);

      this.phoneListService.AddGroup(formData).subscribe({
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
}
