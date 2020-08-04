import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public selectedUser = null;

  public head = [
    {headerName: 'ID', field: 'id', sortable: true, filter: true, checkboxSelection: true},
    {headerName: 'NAME', field: 'user.displayName', sortable: true, filter: true },
    {headerName: 'EMAIL', valueGetter: (params) => params.data.user.email, sortable: true, filter: true},
    {headerName: 'EXPERTISE', field: 'areaOfExpertise', sortable: true, filter: true},
    {headerName: 'CREATED AT', field: 'createdAt', sortable: true, filter: true},
    {headerName: 'MAX STUDENTS', field: 'maxNoOfStudents', sortable: true, filter: true},
    {headerName: 'TIMING', field: 'timing', sortable: true, filter: true},
    {headerName: 'APPROVED', field: 'approved', sortable: true, filter: true},
    {headerName: 'CREATED BY', field: 'createdBy.email', sortable: true, filter: true},
    {headerName: 'LINKEDIN', field: 'linkedinProfile', sortable: true, filter: true},
    {headerName: 'TWITTER', field: 'twitterProfile', sortable: true, filter: true},
    {headerName: 'FACEBOOK', field: 'fbProfile', sortable: true, filter: true},
    {headerName: 'INSTAGRAM', field: 'instaProfile', sortable: true, filter: true},
  ];

  public url = environment.apiUrl + '/instructor';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  rowSelected(event) {
    this.selectedUser = event;
  }

  openUser() {
    if (this.selectedUser) {
      console.log(this.selectedUser.id)
      this.router.navigate(['instructors', 'info', this.selectedUser.id]);
    }
  }
}
