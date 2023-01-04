# Notes

Random angular caveats and tricky stuff.

## Using a 3rd party nodejs lib in a directive/component and then mocking it

[source](./src/app/directives/markdown.directive.ts)

1. wrap the functionality in a class and then inject it through `providers`

```typescript
const markedLib = require('marked');
type MarkedFunc = (source: string) => string;

export class MarkedWrapper {
  process: MarkedFunc = markedLib;
}

@Directive({
  selector: '[appMarkdown]',
  providers: [ MarkedWrapper ]
})
```

2. in the [test](./src/app/directives/markdown.directive.spec.ts):
   1. create a mock
   2. create a fake wrapper component
   3. if it is deep down, then override the host directive and inject the fake wrapper

## Accessing a component's child components/directives during testing

1. use the mock directive in TestBed's declarations
2. after triggered changes go and collect the stray directives:

```typescript
el = fixture.debugElement;
fixture.detectChanges();
const mockEl = el.queryAll(By.directive(MockFooDirective));
mockFooInstances = mockEl.map(mEl => mEl.injector.get(MockFooDirective));
```

[source](./src/app/components/repo-item/repo-item.component.spec.ts)

## Testing components with @input and @output with a wrapper component

If setting the @input directly is not enough, one can easily create a fake wrapper.
Without a wrapper NgOnChanges will not fire, SImpleChanges must be triggered manually.

[source](./src/app/components/search-form/search-form.component.spec.ts)

```typescript
@Component({
  template: `
    <app-search-form [query]="'foo'" (query-change)="onChange($event)">
      Baz
    </app-search-form>
  `
})
class TestComponent {
  @ViewChild(SearchFormComponent) child: SearchFormComponent;
  onChange = createSpy('onChange');
}
```

The real component is available via `component.child`, which may be convenient.

## Get component or directive attached to element

```typescript
const dir = el.query(By.css('.foo-bar')).injector.get(MockRouterLinkDirective);
```

## Do I need the async wrapper in the first beforeEach?

Yes. From the docs:  
"this is necessary in order to call the asynchronous TestBed.**compileComponents** method."

## The dom is not updating

Have you called `fixture.detectChanges();`? During testing the on changes reactivity
will not work automatically.

## Karma shows ERROR, but no error message

Run karma with `ng test --sourcemap=false`.
