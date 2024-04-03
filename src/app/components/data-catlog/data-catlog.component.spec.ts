import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCatlogComponent } from './data-catlog.component';

describe('DataCatlogComponent', () => {
  let component: DataCatlogComponent;
  let fixture: ComponentFixture<DataCatlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCatlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCatlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
