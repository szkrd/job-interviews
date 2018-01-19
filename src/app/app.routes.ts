import { RouterModule, Routes } from '@angular/router';
import { IssuesPageComponent } from './component/issues-page/issues-page.component';
import { ReposPageComponent } from './component/repos-page/repos-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'repos', pathMatch: 'full' },
  { path: 'repos', component: ReposPageComponent },
  { path: 'issues/:id', component: IssuesPageComponent }
];

export const routing = RouterModule.forRoot(routes);
