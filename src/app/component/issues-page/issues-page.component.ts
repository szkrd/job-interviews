import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-issues-page',
  templateUrl: './issues-page.component.html',
  styleUrls: ['./issues-page.component.scss']
})
export class IssuesPageComponent implements OnInit, OnDestroy {
  repoId: number;
  private routeChange: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeChange = this.route.params.subscribe(params => {
      this.repoId = parseInt(params['id'], 10);
      // load issues using service here
    });
  }

  ngOnDestroy() {
    this.routeChange.unsubscribe();
  }

}
