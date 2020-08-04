import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  public id = null;
  public user = null;
  public sub = null;
  public loaded = false;

  public copied = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private http: HttpClient,
    private clipboardService: ClipboardService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      data => {
        this.id = data.id;
        this.http.get<any>(environment.apiUrl + '/user/' + data.id).subscribe(user => {
          this.user = user.data;
          this.loaded = true;
        });
      }
    );
  }

  back() {
    this.location.back();
  }

  copy() {
    if (this.loaded) {
      this.clipboardService.copyFromContent(this.user.id);
      alert('successfully copied : ' + this.user.id);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
