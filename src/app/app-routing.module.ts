import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { BranchDetailComponent } from './pages/branch-detail/branch-detail.component';
import { CommitDetailComponent } from './pages/commit-detail/commit-detail.component';

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
  },
  {
    path: 'branches/:branchName/commits',
    component: BranchDetailComponent,
  },
  {
    path: 'branches/:branchName/commits/:ref',
    component: CommitDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
