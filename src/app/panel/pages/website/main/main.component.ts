import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public blogs;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(environment.apiUrl + '/blog').subscribe(
      data => {
        console.log(data);
        this.blogs = data.data;
      }
    )
  }

}
