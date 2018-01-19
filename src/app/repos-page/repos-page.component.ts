import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {RepoService} from '../service/repo.service';
import {HttpResponse} from '@angular/common/http';
import extractGithubHttpHeaders from '../util/extract-github-http-headers';
import sanitizeRepoItem from '../util/sanitize-repo-item';
import {RepoItem} from '../model/repo-item';

@Component({
  selector: 'app-repos-page',
  templateUrl: './repos-page.component.html',
  styleUrls: ['./repos-page.component.scss']
})
export class ReposPageComponent implements OnInit, OnDestroy {
  queryString = '';
  repoItems: RepoItem[] = [];
  private routeChange: Subscription;

  constructor(
    private repoService: RepoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeChange = this.route
      .queryParams
      .subscribe(params => {
        this.onQueryChange((params['q'] || '').trim(), true);
      });
  }

  ngOnDestroy() {
    this.routeChange.unsubscribe();
  }

  onQueryChange(text: string, isRouterEvent = false) {
    // if (this.queryString === text && !isRouterEvent) {
    //   return;
    // }

    this.queryString = text;

    if (isRouterEvent) {
      this.doSearch();
    } else {
      this.router.navigate(['repos'], { queryParams: { q: text } });
    }
  }

  doSearch () {
    const { queryString } = this;
    if (!queryString) {
      this.repoItems = [];
      return;
    }
    this.repoService
      .search(this.queryString)
      .subscribe(
        (data: HttpResponse<any>) => {
          console.log(extractGithubHttpHeaders(data));
          this.repoItems = data.body.items.map(sanitizeRepoItem);
        },
        error => {
          console.log(error);
        }
      );
  }

}
