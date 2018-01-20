import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
const markedLib = require('marked');

type MarkedFunc = (source: string) => string;

export class MarkedWrapper {
  process: MarkedFunc = markedLib;
}

@Directive({
  selector: '[appMarkdown]',
  // unfortunately the directive's provider overrides testbed's injector,
  // so we have to specifically force testbed to override this one too
  providers: [ MarkedWrapper ]
})
export class MarkdownDirective implements OnChanges, OnInit {
  @Input('appMarkdown') text: string;

  constructor (private el: ElementRef, private marked: MarkedWrapper) {}

  ngOnInit () {
    this.el.nativeElement.classList.add('markdown-body');
  }

  ngOnChanges (changes) {
    if (changes.text) {
      this.el.nativeElement.innerHTML = this.marked.process(changes.text.currentValue);
    }
  }
}
