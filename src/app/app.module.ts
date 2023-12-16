import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {LoginService } from './login-servic.service'
import { HttpClientModule } from '@angular/common/http';
import { DataSharingService } from './data-sharing.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ChangeNameComponent } from './change-name/change-name.component';
import { CatrgoresComponent } from './catrgores/catrgores.component';
import { TagsComponent } from './tags/tags.component';
import { MassageUsComponent } from './massage-us/massage-us.component';
import { FilterTagsComponent } from './filter-tags/filter-tags.component';
import { VideoTagsComponent } from './video-tags/video-tags.component';
import { VideoShowComponent } from './video-show/video-show.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { VideosComponent } from './videos/videos.component';




// import { PhoneListService } from './phone-list.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegistrationComponent,
    PasswordChangeComponent,
    RestPasswordComponent,
    FooterComponent,
    SideBarComponent,
    AboutComponent,
    HomeComponent,
    ChangeNameComponent,
    CatrgoresComponent,
    TagsComponent,
    MassageUsComponent,
    FilterTagsComponent,
    VideoTagsComponent,
    VideoShowComponent,
    AddGroupComponent,
    EditGroupComponent,
    UsersComponent,
    EditUserComponent,
    SearchComponent,
    PageNotFoundComponentComponent,
    FavoriteComponent,
    UsergroupComponent,
    VideosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    ReactiveFormsModule,

    ],
  providers: [LoginService ,  DataSharingService,  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
