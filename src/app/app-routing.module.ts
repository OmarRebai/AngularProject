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
import { AuthGuard } from 'src/Gard/auth.guard';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  {
    path: 'members',
    children: [
      {
        path: 'create',
        pathMatch: 'full',
        component: MemberFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/:id',
        pathMatch: 'full',
        component: MemberFormComponent,
        canActivate: [AuthGuard],
      },
      { path: '', pathMatch: 'full', component: MemberListComponent },
    ],
  },
  {
    path: 'events',
    children: [
      {
        path: 'create',
        pathMatch: 'full',
        component: EventCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/:id',
        pathMatch: 'full',
        component: EventCreateComponent,
        canActivate: [AuthGuard],
      },
      { path: '', pathMatch: 'full', component: EventsComponent },
    ],
  },
  { path: 'tools', pathMatch: 'full', component: ToolsComponent },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'articles', pathMatch: 'full', component: ArticlesComponent },

  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
