import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
const marked = require('marked');

@Directive({
  selector: '[appMarkdown]'
})
export class MarkdownDirective implements OnChanges, OnInit {
  @Input('appMarkdown') text: string;

  constructor(private el: ElementRef) { }

  ngOnInit () {
    this.el.nativeElement.classList.add('markdown-body');
  }

  ngOnChanges(changes) {
    if (changes.text) {
      this.el.nativeElement.innerHTML = marked(changes.text.currentValue);
    }
  }

}
