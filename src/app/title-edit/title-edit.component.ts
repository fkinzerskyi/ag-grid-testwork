import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'app-title-edit',
  templateUrl: './title-edit.component.html',
  styleUrls: ['./title-edit.component.scss'],
})
export class TitleEditComponent {
  params: any;
  agInit(params: any) {
    this.params = params;
    console.log(this.params);
  }

  // isPopup(): boolean {
  //   return true;
  // }

  getValue(): any {
    return this.params.value;
  }
}
