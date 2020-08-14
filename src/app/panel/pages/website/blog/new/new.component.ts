import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public title = '';

  public loading = false;
  public error = '';


  constructor(
    private location: Location,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

  createBlog() {
    console.log(this.title);
    if (this.title.length > 0) {
      this.loading = true;
      this.http.post<any>(environment.apiUrl + '/blog', {title: this.title}).subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.router.navigate(['/website-settings', 'blog', 'edit', data.data.id]);
        },
        error => {
          this.loading = false;
          this.error = error;
        }
      );
    } else {
      this.error = 'Please enter a valid input';
    }
  }

}
