import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberFormComponent } from './member-form/member-form.component';

const routes: Routes = [
  { path: 'members', pathMatch: 'full', component: MemberListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'members' },
  { path: 'create', pathMatch: 'full', component: MemberFormComponent },
  { path: '**', redirectTo: 'members' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
