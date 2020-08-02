import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-application-viewer',
  templateUrl: './application-viewer.component.html',
  styleUrls: ['./application-viewer.component.scss']
})
export class ApplicationViewerComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
