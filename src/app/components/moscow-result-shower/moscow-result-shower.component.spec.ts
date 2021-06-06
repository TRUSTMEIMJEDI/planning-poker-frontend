import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoscowResultShowerComponent } from './moscow-result-shower.component';

describe('MoscowResultShowerComponent', () => {
  let component: MoscowResultShowerComponent;
  let fixture: ComponentFixture<MoscowResultShowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoscowResultShowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoscowResultShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
