import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPullComponent } from './new-pull.component';

describe('NewPullComponent', () => {
  let component: NewPullComponent;
  let fixture: ComponentFixture<NewPullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
