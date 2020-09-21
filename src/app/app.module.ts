import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { NavbarComponent } from './components/navbar/navbar.component';

// pages
import { HomeComponent } from './pages/home/home.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { BranchDetailComponent } from './pages/branch-detail/branch-detail.component';
import { CommitDetailComponent } from './pages/commit-detail/commit-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BranchesComponent,
    BranchDetailComponent,
    CommitDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
