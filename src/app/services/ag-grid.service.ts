import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgGridService {
  gridApi;
  selectedCount = 0;
  totalCount = 0;
  allSelected;
  allSelected$ = new BehaviorSubject(false);

  toggleSelect(event) {
    this.gridApi.forEachNode(function (node) {
      node.setSelected(event);
    });
  }

  constructor() {}
}
