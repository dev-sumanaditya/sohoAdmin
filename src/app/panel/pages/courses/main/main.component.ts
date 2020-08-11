import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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

  public url = environment.apiUrl + '';
  public selectedUser = {id: 123}; // change this later

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  rowSelected(event) {
    this.selectedUser = event;
  }

  viewCourse() {
    if (this.selectedUser) {
      this.router.navigate(['courses', 'view', this.selectedUser.id]);
    }
  }

}
