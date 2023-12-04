import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemispheresComponent } from './semispheres.component';

describe('SemispheresComponent', () => {
  let component: SemispheresComponent;
  let fixture: ComponentFixture<SemispheresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemispheresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemispheresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
