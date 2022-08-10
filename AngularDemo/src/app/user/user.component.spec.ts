import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonService, Teams } from '../services/common.service';
import { UserComponent } from './user.component';
import { HttpClient } from '@angular/common/http';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let comService: CommonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [HttpClientTestingModule],
      providers: [CommonService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
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
   
   it('It should return expected user list', () => {
    const apiEndPoint = comService.baseUrl +  '5cefcdec-e746-4634-9080-29c0b8e033a3';
    comService.ExecuteGet(apiEndPoint).subscribe((coursesData: any) => {
      expect(coursesData).toBeDefined();
      expect(coursesData.length).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(apiEndPoint);
    expect(req.request.method).toEqual('GET');

    // req.flush(expectedEmps); //Return expected teams
  });
});
