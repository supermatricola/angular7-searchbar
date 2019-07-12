import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime ,distinctUntilChanged,switchMap,map, share, mergeMap} from 'rxjs/operators';

@Injectable()
export class SearchService {
  baseUrl: string = 'https://api.cdnjs.com/libraries?search=';

  constructor(private http: HttpClient) { }

  search(terms$: Observable<string>):Observable<any> {
    return terms$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => 
        this.searchEntries(term)),
      );
      
  }

  searchEntries(term):Observable<any> {
    return this.http.get(`${this.baseUrl}${term}`);
  }
}
