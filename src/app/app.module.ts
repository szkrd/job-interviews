import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


import { AppComponent } from './app.component';
import { ReposPageComponent } from './repos-page/repos-page.component';
import { IssuesPageComponent } from './issues-page/issues-page.component';
import { routing } from './app.routes';
import { SearchFormComponent } from './search-form/search-form.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RepoService} from './service/repo.service';
import {HttpGetCacheInterceptor} from './interceptor/http-get-cache.interceptor';
import { RepoItemComponent } from './repo-item/repo-item.component';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    ReposPageComponent,
    IssuesPageComponent,
    SearchFormComponent,
    RepoItemComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    RepoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpGetCacheInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
