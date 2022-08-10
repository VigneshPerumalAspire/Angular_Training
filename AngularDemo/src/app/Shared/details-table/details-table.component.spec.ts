import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsTableComponent } from './details-table.component';
import { CommonService, Teams } from '../../services/common.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetailsTableComponent', () => {
  let component: DetailsTableComponent;
  let fixture: ComponentFixture<DetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTableComponent ], 
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Parent data is available in child data checking', () => {
    expect(component.tableData).toBeDefined();
    expect(component.displayColNames).toBeDefined();
  });


});
