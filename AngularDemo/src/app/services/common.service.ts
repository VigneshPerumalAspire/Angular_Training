import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Teams {
    GameActivityTag: string;
    TeamName: string;
    StartDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    baseUrl = 'https://mocki.io/v1/';

    constructor(private http: HttpClient) { }

    ExecuteGet(apiendpoint: string): Observable<any> {
        return this.http.get(this.baseUrl + apiendpoint);
    }
}