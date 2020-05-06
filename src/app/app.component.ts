import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';
import { CheckboxHeaderComponent } from './checkbox-header/checkbox-header.component';
import { AgGridService } from './services/ag-grid.service';
import { TitleEditComponent } from './title-edit/title-edit.component';
import dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  allChecked = false;
  title = 'aggrid';
  rowData: any;
  public gridOptions: GridOptions;
  private gridApi;
  private gridColumnApi;
  public frameworkComponents;

  columnDefs = [
    {
      headerName: '',
      hide: true,
      field: 'isChecked',
      editable: true,
      width: 30,
      checkboxSelection: true,
      angularCompileHeaders: true,
      headerComponentFramework: CheckboxHeaderComponent,
    },
    {
      headerName: '',
      field: 'thumbnails',
      cellRenderer: function (params) {
        return `<img
          border="0"
          width="120"
          height="90"
          src="${params.value}"
        />`;
      },
    },
    {
      headerName: 'Published on',
      field: 'publishedAt',
      cellClass: 'text-cell',
    },
    {
      headerName: 'Video Title',
      field: 'title',
      cellRenderer: function (params) {
        return (
          `<a href="https://www.youtube.com/watch?v=${params.value.videoId}" target="_blank">` +
          params.value.title +
          '</a>'
        );
      },
      editable: true,
      cellEditor: 'titleEditComponent',
    },
    { headerName: 'Description', field: 'description', cellClass: 'text-cell' },
  ];

  constructor(private http: HttpClient, public agGridService: AgGridService) {
    this.gridOptions = <GridOptions>{};
    this.frameworkComponents = {
      titleEditComponent: TitleEditComponent,
    };
  }

  onRowSelected(event) {
    event.node.selected
      ? this.agGridService.selectedCount++
      : this.agGridService.selectedCount--;

    if (
      this.agGridService.allSelected !==
      (this.agGridService.totalCount === this.agGridService.selectedCount)
    ) {
      this.agGridService.allSelected$.next(
        this.agGridService.totalCount === this.agGridService.selectedCount
      );
    }
  }

  toggleSelect() {
    this.gridColumnApi.setColumnVisible('isChecked', this.allChecked);
  }

  onGridReady(params) {
    this.agGridService.gridApi = params.api;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  getConfig() {
    return this.http.get(
      'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAdsarjMB3NCIe99_d3TcTmj42xgn_AEA8&maxResults=50&type=video&part=snippet&q=john'
    );
  }

  ngOnInit() {
    this.getConfig()
      .pipe()
      .subscribe((res: any) => {
        this.rowData = res.items.map((item) => {
          const { snippet } = item;
          return {
            thumbnails: snippet.thumbnails.default.url,
            publishedAt: dayjs(snippet.publishedAt).format(
              'YYYY-MM-DD [at] HH:mm:ss'
            ),
            title: { title: snippet.title, videoId: item.id.videoId },
            description: snippet.description,
            isChecked: '',
          };
        });
        this.agGridService.totalCount = res.items.length;
      });
  }
}
