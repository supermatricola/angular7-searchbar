import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from './search.service';
import { Subject, Observable,of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent implements OnInit,OnDestroy{

  results$: Observable<string>;
  searchTerm$ = new Subject<string>();
  
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.results$ = results.results;
      }); 
  }

  ngOnDestroy(): void {
    this.searchTerm$.unsubscribe();
  }

  onSearchChange(value:string):void{
    this.searchTerm$.next(value)
  }
}