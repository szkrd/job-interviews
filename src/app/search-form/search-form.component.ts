import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {NgForm} from '@angular/forms';

interface OutputPayload {
  query: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnChanges {
  @Input('query') defaultQuery = '';

  // simple "change" would collide with the html event
  // (probably an OutputPayload type would be useful
  // for anything more complex then a pebble
  @Output('query-change') queryEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  // parent -> child
  ngOnChanges(changes) {
    if (changes.defaultSelectedColor) {
      this.defaultQuery = changes.defaultQuery.currentValue;
    }
  }

  // child -> parent
  submit(form: NgForm) {
    this.queryEmitter.emit(form.value.query);
  }

}
