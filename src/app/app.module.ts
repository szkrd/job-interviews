import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


import { AppComponent } from './app.component';
import { ReposPageComponent } from './components/repos-page/repos-page.component';
import { IssuesPageComponent } from './components/issues-page/issues-page.component';
import { routing } from './app.routes';
import { SearchFormComponent } from './components/search-form/search-form.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RepoService} from './services/repo.service';
import {HttpGetCacheInterceptor} from './interceptors/http-get-cache.interceptor';
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { IssueItemComponent } from './components/issue-item/issue-item.component';
import {IssueService} from './services/issue.service';
import { LoaderComponent } from './components/loader/loader.component';
import { MarkdownDirective } from './directives/markdown.directive';


@NgModule({
  declarations: [
    AppComponent,
    ReposPageComponent,
    IssuesPageComponent,
    SearchFormComponent,
    RepoItemComponent,
    PaginationComponent,
    IssueItemComponent,
    LoaderComponent,
    MarkdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    RepoService,
    IssueService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpGetCacheInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
