import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  public id = '';
  private sub;
  public data = null;

  public submitted = false;
  public selectForm: FormGroup;
  public error = '';
  public loading = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private adminService: AdminService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      if (params.id && params.id !== 'new') {
        this.id = params.id;
        this.adminService.getAdminData(params.id).subscribe(data => {
          this.data = data.data;
          console.log(data);
        });
      }
    });

    this.selectForm = this.fb.group({
      id: [
        this.id,
        [
          Validators.required
        ],
      ]
    });
  }

  get SelectFormControl() {
    return this.selectForm.controls;
  }

  backClicked() {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;
    if (this.selectForm.valid) {
      this.loading = true;
      this.adminService.getAdminData(this.selectForm.value.id).subscribe(
        data => {
          this.id = data.data.id;
          this.data = data.data;
          this.loading = false;
        }, err => {
          this.error = err;
          this.loading = false;
        }
      );
    } else {
      return;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
