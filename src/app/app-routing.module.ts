import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { BranchDetailComponent } from './pages/branch-detail/branch-detail.component';
import { CommitDetailComponent } from './pages/commit-detail/commit-detail.component';
import { PullsComponent } from './pages/pulls/pulls.component';
import { NewPullComponent } from './pages/new-pull/new-pull.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'branches',
    component: BranchesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'branches/:branchName/commits',
    component: BranchDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'branches/:branchName/commits/:ref',
    component: CommitDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pulls',
    component: PullsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pulls/create',
    component: NewPullComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
