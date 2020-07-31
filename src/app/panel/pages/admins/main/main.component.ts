import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public selectedUser = null;

  public head = [
    {headerName: 'ID', field: 'id', sortable: true, filter: true, checkboxSelection: true},
    {headerName: 'NAME', field: 'name', sortable: true, filter: true },
    {headerName: 'EMAIL', field: 'email', sortable: true, filter: true},
    {headerName: 'ROLE', field: 'role', sortable: true, filter: true},
    {headerName: 'REGISTERED DATE', field: 'date', sortable: true, filter: true},
    {headerName: 'EMAIL VERIFIED', field: 'emailVerified', sortable: true, filter: true},
    {headerName: 'USER ID', field: 'uid', sortable: true, filter: true}
  ];

  public url = 'http://localhost:3000/users';

  constructor() { }

  ngOnInit(): void {
  }

  rowSelected(event) {
    console.log(event);
    this.selectedUser = event;
  }

  viewAdmin() {
    alert('view ='+ this.selectedUser.uid);
  }
}
