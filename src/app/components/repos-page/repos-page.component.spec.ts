/* tslint:disable: no-floating-promises */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposPageComponent } from './repos-page.component';

xdescribe('ReposPageComponent', () => {
  let component: ReposPageComponent;
  let fixture: ComponentFixture<ReposPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReposPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
