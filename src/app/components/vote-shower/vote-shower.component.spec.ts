import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteShowerComponent } from './vote-shower.component';

describe('VoteShowerComponent', () => {
  let component: VoteShowerComponent;
  let fixture: ComponentFixture<VoteShowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations : [ VoteShowerComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
