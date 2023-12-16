import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormalUserGuard} from './can-deactivate.guardnormaluser';
import { NormalAdminGuard} from './can-deactivate.guardnormaladmin';
import { SuperAdminGuard} from './can-deactivate.guardSuperadmin';
import { RegistrationComponent } from './registration/registration.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChangeNameComponent } from './change-name/change-name.component';
import { CatrgoresComponent } from './catrgores/catrgores.component';
import { TagsComponent } from './tags/tags.component';
import { MassageUsComponent } from './massage-us/massage-us.component';
import { FilterTagsComponent } from './filter-tags/filter-tags.component';
import { VideoTagsComponent } from './video-tags/video-tags.component';
import { VideoShowComponent } from './video-show/video-show.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { VideosComponent } from './videos/videos.component';



const routes: Routes = [
  // { path: 'Edit/:id', component: CreatComponent , canActivate: [CreatAccessGuard] },
  { path : "" , component : HomeComponent },
  { path:'Users/EditUser' , component: EditUserComponent  , canActivate: [NormalAdminGuard]},
  { path:'Users/AddUser' , component: RegistrationComponent  , canActivate: [NormalAdminGuard]},
  { path :"Users/usergroup" , component : UsergroupComponent ,  canActivate: [NormalAdminGuard] },
  { path:'Users' , component: UsersComponent  , canActivate: [NormalAdminGuard]},
  { path:'home/restpassword' , component: RestPasswordComponent , canActivate: [SuperAdminGuard]},
  { path : "home/changePassword" , component : PasswordChangeComponent , canActivate: [NormalAdminGuard]},
  { path : "catrgores/AddGroup" , component : AddGroupComponent , canActivate: [NormalAdminGuard] },
  { path : "catrgores/EditGroup" , component : EditGroupComponent , canActivate: [NormalAdminGuard]},
  { path : "home/changeName" , component : ChangeNameComponent , canActivate: [NormalAdminGuard] },
  { path : "tags" , component : TagsComponent , canActivate: [NormalAdminGuard]},
  { path : "videos" , component : VideosComponent , canActivate: [NormalAdminGuard]},
  { path : "login" , component : LoginComponent },
  { path : "Favorite" , component : FavoriteComponent },
  { path : "search" , component : SearchComponent },
  { path : "home" , component : HomeComponent },
  { path : "catrgores" , component : CatrgoresComponent },
  { path : "massagems" , component : MassageUsComponent },
  { path : "catrgores/tags" , component : FilterTagsComponent },
  { path : "catrgores/tags/Videos" , component : VideoTagsComponent },
  { path : "catrgores/tags/Videos/video" , component : VideoShowComponent },
  { path : "search/video" , component : VideoShowComponent },
  { path : "Favorite/Video" , component : VideoShowComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
