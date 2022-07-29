import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) { }

    ExecuteGet(): Observable<any> {
        return this.http.get('https://mocki.io/v1/a638c068-89c2-4e24-8447-20a03f5e7b77');
    }
}