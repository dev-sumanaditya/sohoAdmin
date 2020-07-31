import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  public selectedUser = null;

  public head = [
    {headerName: 'ID', field: 'id', sortable: true, filter: true, checkboxSelection: true},
    {headerName: 'NAME', field: 'name', sortable: true, filter: true },
    {headerName: 'EMAIL', field: 'email', sortable: true, filter: true},
    {headerName: 'REGISTERED DATE', field: 'date', sortable: true, filter: true},
    {headerName: 'EXPERTIESE', field: 'emailVerified', sortable: true, filter: true},
    {headerName: 'USER ID', field: 'uid', sortable: true, filter: true}
  ];

  public url = 'http://localhost:3000/users';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  rowSelected(event) {
    this.selectedUser = event;
  }

  viewApplication() {
    if (this.selectedUser) {
      this.router.navigate(['/instructors', 'view-application', this.selectedUser.uid]);
    }
  }

}
