import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit, OnDestroy {
  public data;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.http
      .get<any>(environment.apiUrl + '/instructor/' + id)
      .subscribe((data) => {
        this.data = data.data;
      });
  }

  goBack() {
    this.location.back();
  }

  deleteInstructor() {
    this.http
      .delete<any>(environment.apiUrl + '/instructor/' + this.data.id)
      .subscribe((data) => {
        this.router.navigate(['/instructors']);
      });
  }

  ngOnDestroy() {}
}
