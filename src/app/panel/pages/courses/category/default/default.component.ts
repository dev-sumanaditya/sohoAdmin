import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  public showCreate = false;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

  createNew() {

  }

}
