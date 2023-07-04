import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home-link',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div
      class="home-link-component"
      routerLinkActive="active"
      [routerLinkActiveOptions]="{ exact: true }"
    >
      <a href="#" routerLink="/"> Home </a>
    </div>
  `,
  styles: [
    `
      .active {
        display: none;
      }
      a {
        color: black;
      }
    `,
  ],
})
export class HomeLinkComponent {}
