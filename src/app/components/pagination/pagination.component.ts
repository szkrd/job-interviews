import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {HeaderLink} from '../../models/header-link';
import {HeaderLinkItem} from '../../models/header-link-item';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('header-link') headerLink: HeaderLink;

  @Output('link-select') headerLinkSelectEmitter = new EventEmitter<HeaderLinkItem>();

  private currentPageNumber = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.headerLink) {
      this.setCurrentPageNumber(changes.headerLink.currentValue);
    }
  }

  // dumb heuristics to find the current page number for the UI
  setCurrentPageNumber (incomingHeaderLink: HeaderLink) {
    if (incomingHeaderLink.next) {
      this.currentPageNumber = Number(incomingHeaderLink.next.page) - 1;
    } else if (incomingHeaderLink.prev) {
      this.currentPageNumber = Number(incomingHeaderLink.next.page) + 1;
    }
  }

  onClick (event: MouseEvent, headerLinkItem: HeaderLinkItem) {
    event.preventDefault();
    const payload: HeaderLinkItem = Object.assign({}, headerLinkItem);
    this.headerLinkSelectEmitter.emit(payload);
  }

}
