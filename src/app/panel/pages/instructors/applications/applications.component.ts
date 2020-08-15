import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  public selectedUser = null;

  public head = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    { headerName: 'NAME', field: 'name', sortable: true, filter: true },
    { headerName: 'EMAIL', field: 'email', sortable: true, filter: true },
    {
      headerName: 'REGISTERED DATE',
      field: 'date',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'EXPERTIESE',
      field: 'emailVerified',
      sortable: true,
      filter: true,
    },
    { headerName: 'USER ID', field: 'uid', sortable: true, filter: true },
  ];

  public url = environment.apiUrl + '/instructor/pending';

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {}

  rowSelected(event) {
    this.selectedUser = event;
  }

  viewApplication() {
    if (this.selectedUser) {
      this.router.navigate(['/instructors', 'viewapp', this.selectedUser.id]);
    }
  }

  goBack() {
    this.location.back();
  }
}
