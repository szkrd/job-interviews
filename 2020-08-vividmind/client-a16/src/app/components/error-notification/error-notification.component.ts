import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, IHttpError } from '../../services/api.service';
import { Subscription } from 'rxjs';

interface IError {
  message: string;
}

@Component({
  selector: 'app-error-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="error-notification-component">
      <li *ngFor="let error of errors">
        <a href="#" (click)="onRemoveClick($event, error)">X</a>
        {{ error.message }}
      </li>
    </ul>
  `,
  styles: [
    `
      ul {
        list-style: none;
        position: fixed;
        bottom: 0;
        right: 10px;
      }

      li {
        margin: -10px 0 0 0;
        padding: 10px;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
        background-color: white;
        width: 220px;
        font-size: 13px;
        color: red;
        position: relative;
      }

      a {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 12px;
        height: 12px;
        font-size: 10px;
        border: 0;
        text-decoration: none;
        padding: 3px;
        background-color: silver;
        border-radius: 0 5px 0 5px;

        &:hover {
          background: red;
          color: white;
        }
      }
    `,
  ],
})
export class ErrorNotificationComponent implements OnInit, OnDestroy {
  errors: IError[] = [];
  httpErrorHandlerSubscription: Subscription | undefined;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.httpErrorHandlerSubscription = this.api.httpErrors$.subscribe(this.onHttpError);
  }

  ngOnDestroy() {
    this.httpErrorHandlerSubscription?.unsubscribe();
  }

  onHttpError = (error: IHttpError) => {
    this.errors.push({ message: error.message });
  };

  onRemoveClick(event: MouseEvent, error: IError) {
    event.preventDefault();
    this.errors = this.errors.filter((current) => current !== error);
  }
}
