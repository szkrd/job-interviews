import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {RepoService} from '../service/repo.service';

@Component({
  selector: 'app-repos-page',
  templateUrl: './repos-page.component.html',
  styleUrls: ['./repos-page.component.scss']
})
export class ReposPageComponent implements OnInit, OnDestroy {
  queryString = '';
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
    // TODO deal with empty
    console.log('service search for repo', this.queryString);
    this.repoService.search(this.queryString);
  }

}
