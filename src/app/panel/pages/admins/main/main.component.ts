import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public selectedUser = null;

  public head = [
    {headerName: 'ID', field: 'id', sortable: true, filter: true, checkboxSelection: true},
    {headerName: 'NAME', field: 'displayName', sortable: true, filter: true },
    {headerName: 'EMAIL', field: 'email', sortable: true, filter: true},
    {headerName: 'USER ID', field: 'uid', sortable: true, filter: true},
    {headerName: 'ROLES', field: 'roles', sortable: true, filter: true, valueGetter: this.valueGetterRole},
    {headerName: 'EMAIL VERIFIED', field: 'emailVerified', sortable: true, filter: true},
    {headerName: 'REGISTERED DATE', field: 'createdAt', sortable: true, filter: true},
    {headerName: 'LAST UPDATED', field: 'updatedAt', sortable: true, filter: true}
  ];

  public url = environment.apiUrl + '/user';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public valueGetterRole({data}) {
    return data.roles.map(role => role.name).join(',');
  }

  rowSelected(event) {
    this.selectedUser = event;
  }

  viewAdmin() {
    if (this.selectedUser) {
      this.router.navigate(['/admins', 'view', this.selectedUser.id]);
    }
  }

  createAdmin() {
    if (this.selectedUser) {
      this.router.navigate(['/admins', 'create', this.selectedUser.id]);
    } else {
      this.router.navigate(['/admins', 'create', 'new']);
    }
  }
}
