import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CascadeComponent } from './cascade.component';

describe('CascadeComponent', () => {
  let component: CascadeComponent;
  let fixture: ComponentFixture<CascadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CascadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CascadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
