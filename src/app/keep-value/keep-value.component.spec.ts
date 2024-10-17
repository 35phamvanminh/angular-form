import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepValueComponent } from './keep-value.component';

describe('KeepValueComponent', () => {
  let component: KeepValueComponent;
  let fixture: ComponentFixture<KeepValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeepValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeepValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
