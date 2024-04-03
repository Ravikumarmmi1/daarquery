import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityConnectionComponent } from './entity-connection.component';

describe('EntityConnectionComponent', () => {
  let component: EntityConnectionComponent;
  let fixture: ComponentFixture<EntityConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
