import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersModalComponent } from './pers-modal.component';

describe('PersModalComponent', () => {
  let component: PersModalComponent;
  let fixture: ComponentFixture<PersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
