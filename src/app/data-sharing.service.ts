import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataSharingService {

  private sharedDataCategory: any;

  setsharedDataCategory(data: any): void {
    this.sharedDataCategory = data;
  }

  getsharedDataCategory(): any {
    return this.sharedDataCategory;
  }

  private sharedArraySubject = new BehaviorSubject<string[]>([]);
  sharedArray$ = this.sharedArraySubject.asObservable();

  updateSharedArray(data: string[]) {
    this.sharedArraySubject.next(data);
  }
  
}


