import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsSettingsComponent } from './shops-settings.component';

describe('ShopsSettingsComponent', () => {
  let component: ShopsSettingsComponent;
  let fixture: ComponentFixture<ShopsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
