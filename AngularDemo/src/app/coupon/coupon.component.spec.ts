import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonService, Teams } from '../services/common.service';
import { CouponComponent } from './coupon.component';
import { HttpClient } from '@angular/common/http';

describe('CouponComponent', () => {
  let component: CouponComponent;
  let fixture: ComponentFixture<CouponComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let comService: CommonService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponComponent ],
      imports: [HttpClientTestingModule],
      providers: [CommonService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponComponent);
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

   it('It should return expected coupon list', () => {
    const apiEndPoint = comService.baseUrl +  '3b8da004-c15c-4528-879e-c4a2259c98c2';
    comService.ExecuteGet(apiEndPoint).subscribe((coursesData: any) => {
      expect(coursesData).toBeDefined();
      expect(coursesData.length).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(apiEndPoint);
    expect(req.request.method).toEqual('GET');

    // req.flush(expectedEmps); //Return expected teams
  });
});
