import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-viewer',
  templateUrl: './application-viewer.component.html',
  styleUrls: ['./application-viewer.component.scss'],
})
export class ApplicationViewerComponent implements OnInit {
  public user;
  public instructorData;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.auth.currentUser.subscribe((data) => {
      this.user = data;
    });
    this.http
      .get<any>(environment.apiUrl + '/instructor/' + id)
      .subscribe((data) => {
        this.instructorData = data.data;
        console.log(data);
      });
  }

  approve() {
    this.http
      .put<any>(
        environment.apiUrl +
          '/instructor/' +
          this.instructorData.id +
          '/approve',
        {}
      )
      .subscribe((data) => {
        this.router.navigate(['/instructors/pending']);
      });
  }

  reject() {
    this.http
      .put<any>(
        environment.apiUrl +
          '/instructor/' +
          this.instructorData.id +
          '/reject',
        {}
      )
      .subscribe((data) => {
        this.router.navigate(['/instructors']);
      });
  }

  async viewFile(resume) {
    console.log(resume);
    // get resume => /instructor/resume/download/resume_id
  }

  goBack() {
    this.location.back();
  }
}
