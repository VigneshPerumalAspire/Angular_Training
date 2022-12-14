import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CommonService, Teams } from './common.service';
import { HttpClient } from '@angular/common/http';

describe('CommonService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let comService: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommonService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    comService = TestBed.inject(CommonService);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  describe('#GetTeamList', () => {
    let expectedEmps: Teams[];

    beforeEach(() => {
      expectedEmps = [
        { GameActivityTag: 'STANDARD', TeamName: 'TestAsp', StartDate: '2021-12-28' },
      ] as Teams[];
    });

    //Test case 1
    it('It should return expected team list', () => {
      const apiEndPoint = 'a638c068-89c2-4e24-8447-20a03f5e7b77';
      comService.ExecuteGet(apiEndPoint).subscribe(coursesData => {
        expect(coursesData[0].GameActivityTag).toEqual('STANDARD');
        expect(coursesData[0].TeamName).toEqual('TestAsp');
        expect(coursesData[0].StartDate).toEqual('2021-12-28');
      });

      const req = httpTestingController.expectOne(comService.baseUrl + apiEndPoint);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedEmps); //Return expected teams
    });

    //Test case 2
    it('Should returning empty teams list', () => {
      const apiEndPoint = 'a638c068-89c2-4e24-8447-20a03f5e7b77';
      comService.ExecuteGet(apiEndPoint).subscribe(
        result => expect(result.length).toEqual(0, 'should have empty teamlist array'),
        fail
      );

      const req = httpTestingController.expectOne(comService.baseUrl + apiEndPoint);
      req.flush([]); //Return empty data
    });
  });
});