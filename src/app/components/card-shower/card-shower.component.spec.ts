import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShowerComponent } from './card-shower.component';

describe('CardShowerComponent', () => {
  let component: CardShowerComponent;
  let fixture: ComponentFixture<CardShowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations : [ CardShowerComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
