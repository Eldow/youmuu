// components/toolbar.component.ts
import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  constructor(public search: SearchService){}
  results = [];
  query: string = '';
  loadResults() {
    this.search.getSearchResults(this.query).subscribe(data => this.results = data);
  }
}
