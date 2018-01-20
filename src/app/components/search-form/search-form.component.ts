import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @Input('query') defaultQuery = '';

  @Input('example') example = '';

  // simple "change" would collide with the html event
  // (probably an OutputPayload type would be useful
  // for anything more complex then a pebble
  @Output('query-change') queryEmitter = new EventEmitter<string>();

  // child -> parent
  submit (form: NgForm) {
    this.queryEmitter.emit(form.value.query);
  }

}
