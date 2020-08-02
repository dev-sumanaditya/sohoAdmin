import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  private sub: any;

  public adminData;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      this.adminService.getAdminData(id).subscribe(
        data => {
          this.adminData = data.data;
        }
      );
   });
  }

  backClicked() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
