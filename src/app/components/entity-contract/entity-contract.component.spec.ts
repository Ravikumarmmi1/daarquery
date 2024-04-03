import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityContractComponent } from './entity-contract.component';

describe('EntityContractComponent', () => {
  let component: EntityContractComponent;
  let fixture: ComponentFixture<EntityContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
