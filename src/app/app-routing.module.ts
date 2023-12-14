import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { EventCreateComponent } from './event-create/event-create.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'members', pathMatch: 'full', component: MemberListComponent },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'tools', pathMatch: 'full', component: ToolsComponent },
  { path: 'articles', pathMatch: 'full', component: ArticlesComponent },
  { path: 'events', pathMatch: 'full', component: EventsComponent },
  { path: 'event/create', pathMatch: 'full', component: EventCreateComponent },
  { path: 'edit/:id', pathMatch: 'full', component: MemberFormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'create', pathMatch: 'full', component: MemberFormComponent },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
