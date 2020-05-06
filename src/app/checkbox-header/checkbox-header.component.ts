import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { AgGridService } from '../services/ag-grid.service';

@Component({
  selector: 'app-checkbox-header',
  templateUrl: './checkbox-header.component.html',
  styleUrls: ['./checkbox-header.component.scss'],
})
export class CheckboxHeaderComponent implements IHeaderAngularComp {
  allChecked;
  agInit(): void {}

  toggleSelect() {
    this.agGridService.toggleSelect(this.allChecked);
  }

  constructor(public agGridService: AgGridService) {
    this.agGridService.allSelected$.subscribe((x) => (this.allChecked = x));
  }
}
