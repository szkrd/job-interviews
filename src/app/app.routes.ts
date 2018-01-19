import { RouterModule, Routes } from '@angular/router';
import { IssuesPageComponent } from './components/issues-page/issues-page.component';
import { ReposPageComponent } from './components/repos-page/repos-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'repos', pathMatch: 'full' },
  { path: 'repos', component: ReposPageComponent },
  { path: 'issues', component: IssuesPageComponent }
];

export const routing = RouterModule.forRoot(routes);
