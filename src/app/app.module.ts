import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

// components
import { NavbarComponent } from './components/navbar/navbar.component';

// pages
import { HomeComponent } from './pages/home/home.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { BranchDetailComponent } from './pages/branch-detail/branch-detail.component';
import { CommitDetailComponent } from './pages/commit-detail/commit-detail.component';
import { PullsComponent } from './pages/pulls/pulls.component';
import { NoticeDialogComponent } from './dialogs/notice-dialog/notice-dialog.component';
import { NewPullComponent } from './pages/new-pull/new-pull.component';
import { LoginFormDialogComponent } from './dialogs/login-form-dialog/login-form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BranchesComponent,
    BranchDetailComponent,
    CommitDetailComponent,
    PullsComponent,
    NoticeDialogComponent,
    NewPullComponent,
    LoginFormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
