import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  form: FormGroup;
  query: FormControl;

  constructor (private formBuilder: FormBuilder) {
    this.createForm();
  }

  // parent -> child
  // (since the route will reload all the components,
  // on init is enough, we won't need on change)
  ngOnInit () {
    this.query.setValue(this.defaultQuery);
  }

  createForm () {
    this.query = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]);
    this.form = this.formBuilder.group({
      query: this.query
    });
  }

  // child -> parent
  submit () {
    this.queryEmitter.emit(this.query.value);
  }

}
