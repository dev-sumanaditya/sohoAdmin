import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public head = [
    {headerName: 'COURSE ID', field: 'id', sortable: true, filter: true, checkboxSelection: true},
    {headerName: 'COURSE NAME', field: 'displayName', sortable: true, filter: true },
    {headerName: 'AUTHOR', field: 'author', sortable: true, filter: true},
    {headerName: 'AUTHOR ID', field: 'uid', sortable: true, filter: true},
    {headerName: 'PRICE', field: '', sortable: true, filter: true},
    {headerName: 'CATEGORY', field: '', sortable: true, filter: true},
    {headerName: 'STATUS', field: '', sortable: true, filter: true},
    {headerName: 'START DATE', field: '', sortable: true, filter: true},
    {headerName: 'DATE CREATED', field: '', sortable: true, filter: true},
    {headerName: 'REGISTERED USERS', field: 'createdAt', sortable: true, filter: true},
    {headerName: 'LAST UPDATED', field: 'updatedAt', sortable: true, filter: true}
  ];

  public url = environment.apiUrl + '/user';
  public selectedUser;

  constructor() { }

  ngOnInit(): void {
  }

  rowSelected(event) {
    this.selectedUser = event;
  }

}
