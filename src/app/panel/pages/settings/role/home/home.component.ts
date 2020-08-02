import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sec = null;
  public selectedRole = null;

  public permissionsArray = [];

  public resources = [
    {
      name: 'Admin',
      value: 'admin'
    },
    {
      name: 'Role',
      value: 'role'
    },
    {
      name: 'Permission',
      value: 'permission'
    },
    {
      name: 'Instructor',
      value: 'instructor'
    },
    {
      name: 'Course',
      value: 'course'
    },
  ]

  public roles = null;

  constructor(
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  selected(data) {
    this.selectedRole = null;
    this.sec = data;
  }

  selectRole(data) {
    this.sec = 1;
    this.selectedRole = data;
  }

  getRoles() {
    this.http.get<any>(environment.apiUrl + '/role').subscribe(data => {
      console.log(data);
    });
  }

  goBack() {
    if (this.sec) {
      this.sec = null;
    } else {
      this.location.back();
    }
  }
}
