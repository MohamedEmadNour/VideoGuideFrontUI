import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class PhoneListService {
  
  local = `https://localhost:44345`
  pup = `http://172.16.118.6:33333`
  lap = `http://192.168.1.3:44345`
  
  public = this.local
  baseUrl = `${this.public}/api/Account`;
  constructor(private _HttpClient: HttpClient) {}




  // User area

  getAllGroups(): Observable<any> {
    return this._HttpClient.get(`${this.public}/api/VideoGuide/Get_Groups`);
  }


  getAllUser(): Observable<any> {
    return this._HttpClient.get(`${this.public}/api/Account/Get_User`);
  }

  getAllTags(): Observable<any> {
    return this._HttpClient.get(`${this.public}/api/VideoGuide/Get_Tags`);
  }

  getTagsOfCategory(GroupID : any ): Observable<any> {
    const params = new HttpParams().set('GroupID', GroupID);
    return this._HttpClient.get(`${this.public}/api/VideoGuide/Get_Tags` , { params });
  }

  getVideosOfTags(TagID : any  , id : any): Observable<any> {
    let params = new HttpParams();
    params = params.append('TagID', TagID );
    params = params.append('Id', id);
    return this._HttpClient.get(`${this.public}/api/VideoGuide/Get_Videos` , { params });
  }

  UpViewForVideo(VideoID : any ): Observable<any> {

    return this._HttpClient.post(`${this.public}/api/VideoGuide/Update_View_Video?VideoID=${VideoID}` ,{VideoID});
  }
  
  getAllVideo(): Observable<any> {
    return this._HttpClient.get(`${this.public}/api/VideoGuide/Get_Videos`);
  }

  getFavVideo(id : string): Observable<any> {
    const params = new HttpParams().set('Id', id);
    return this._HttpClient.get(`${this.public}/api/VideoGuide/Get_Videos` , { params } );
  }
  AddingFav(VideoID: number, id: any): Observable<any> {
    const requestBody = {
      id : id,
      videoID : VideoID
    };
    // console.log(requestBody);
    
    return this._HttpClient.post(`${this.public}/api/VideoGuide/AddFav`, requestBody);
  }

  getSearchVideo(VedoName : string | number ): Observable<any> {
    const params = new HttpParams().set('search', VedoName);
    return this._HttpClient.get(`${this.public}/api/VideoGuide/Get_Videos` ,{ params });
  }



  // admin area



  usertogroup(user: any): Observable<any> {
    const url = `${this.public}/api/VideoGuide/AddGroupUser`;
    return this._HttpClient.post(url, user);
  }
  AddGroup(user: any): Observable<any> {
    const url = `${this.public}/api/VideoGuide/Insert_Groups`;
    return this._HttpClient.post(url, user);
  }
  EditGroup(user: any , headers : any  ): Observable<any> {
    const url = `${this.public}/api/VideoGuide/Update_Groups`;
    return this._HttpClient.post(url, user , headers);
  }

  
  AddTag(user: any , headers : any  ): Observable<any> {
    const url = `${this.public}/api/VideoGuide/Insert_Tags`;
    return this._HttpClient.post(url, user , headers);
  }
  EditTag(user: any , headers : any  ): Observable<any> {
    const url = `${this.public}/api/VideoGuide/Update_Tags`;
    return this._HttpClient.post(url, user , headers);
  }

  AddVideo(user: any): Observable<any> {
    const url = `${this.public}/api/VideoGuide/AddVideo`;
    return this._HttpClient.post(url, user);
  }





    // Registration
    register(user: any): Observable<any> {
      const url = `${this.baseUrl}/register`;
      return this._HttpClient.post(url, user);
    }
    EditUser(user: any): Observable<any> {
      const url = `${this.baseUrl}UpdateUser`;
      return this._HttpClient.post(url, user);
    }
  
    // Login
    login(credentials: any): Observable<any> {
      const url = `${this.baseUrl}/login`;
      // console.log(credentials);
      
      return this._HttpClient.post(url, credentials);
    }
  
    // Password Change
    changePassword(newPasswordData: any): Observable<any> {
      const url = `${this.baseUrl}/ChangePassword`;
      return this._HttpClient.post(url, newPasswordData);
    }
    changeUserName(newPasswordData: any): Observable<any> {
      const url = `${this.baseUrl}/Change_FullName`;
      return this._HttpClient.post(url, newPasswordData);
    }
    restPassword(newPasswordData: any): Observable<any> {
      const url = `${this.baseUrl}/RestPassword`;
      return this._HttpClient.post(url, newPasswordData);
    }
  }



