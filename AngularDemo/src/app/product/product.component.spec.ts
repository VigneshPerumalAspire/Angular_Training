import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonService, Teams } from '../services/common.service';

import { ProductComponent } from './product.component';
import { HttpClient } from '@angular/common/http';
import { MockComponent } from 'ng-mocks';
import { DetailsTableComponent } from '../Shared/details-table/details-table.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let comService: CommonService;
  let ChildComponent: DetailsTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent, MockComponent(DetailsTableComponent), ], 
      imports: [HttpClientTestingModule],
      providers: [CommonService],
      schemas:[ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    comService = TestBed.inject(CommonService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have service', () => {
    const service: CommonService = TestBed.get(CommonService);
    expect(service).toBeTruthy();
   });

   it('should have getData function', () => {
    const service: CommonService = TestBed.get(CommonService);
    expect(service.ExecuteGet).toBeTruthy();
   });

   it('It should return expected products list', () => {
    const apiEndPoint = comService.baseUrl + 'ea15ed4e-50e0-4f64-af4b-4082cb288641';
    comService.ExecuteGet(apiEndPoint).subscribe((coursesData: any) => {
      expect(coursesData).toBeDefined();
      expect(coursesData.length).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(apiEndPoint);
    expect(req.request.method).toEqual('GET');

    // req.flush(expectedEmps); //Return expected teams
  });

});
