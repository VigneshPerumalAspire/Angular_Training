import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) { }

    ExecuteGet(url: string): Observable<any> {
        return this.http.get(url);
    }
}