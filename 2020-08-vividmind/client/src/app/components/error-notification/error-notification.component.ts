import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService, IHttpError } from '../../services/api.service';
import { Subscription } from 'rxjs';

interface IError {
  message: string;
}

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent implements OnInit, OnDestroy {
  errors: IError[] = [];
  httpErrorHandlerSubscription: Subscription;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    this.httpErrorHandlerSubscription = this.api.httpErrors$.subscribe(this.onHttpError);
  }

  ngOnDestroy() {
    this.httpErrorHandlerSubscription.unsubscribe();
  }

  onHttpError = (error: IHttpError) => {
    this.errors.push({ message: error.message });
  }

  onRemoveClick(event: MouseEvent, error: IError) {
    event.preventDefault();
    this.errors = this.errors.filter(current => current !== error);
  }
}
