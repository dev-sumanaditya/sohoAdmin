import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {

  // inputs
  @Input() header: any[];
  @Input() url: any[];

  // event emitters
  @Output() rowSelected = new EventEmitter();
  @Output() dataLoaded = new EventEmitter();

  public columnDefs;
  public rowData;
  public dataUrl;
  public loaded = false;
  public selectedRow;

  @ViewChild('agGrid') agGrid: AgGridAngular;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.columnDefs = this.header;
    this.dataUrl = this.url;

    this.http.get<any>(this.dataUrl).subscribe(({data}) => {
      this.rowData = data;
      this.loaded = true;
      this.dataLoaded.emit(true);
    },
    (error) => {
      this.dataLoaded.emit(error);
    }
    );
  }

  public onSelectionChanged() {
    this.getSelectedRows();
    this.rowSelected.emit(this.selectedRow);
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    this.selectedRow = selectedData[0];
  }

}
