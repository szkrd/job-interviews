import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';

interface OutputPayload {
  query: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Input('query') defaultQuery = '';

  @Input('example') example = '';

  // simple "change" would collide with the html event
  // (probably an OutputPayload type would be useful
  // for anything more complex then a pebble
  @Output('query-change') queryEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  // child -> parent
  submit(form: NgForm) {
    this.queryEmitter.emit(form.value.query);
  }

}
