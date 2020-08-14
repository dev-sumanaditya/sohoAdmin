import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  public id = '';
  private sub;
  public data = null; // user data

  public submitted = false;
  public selectForm: FormGroup;
  public error = '';
  public loading = false;

  public saveForm: FormGroup;

  public rolesData;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private adminService: AdminService,
    public fb: FormBuilder,
    private http: HttpClient
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

    this.saveForm = this.fb.group({
      roles: this.fb.array([])
    });
  }

  get SelectFormControl() {
    return this.selectForm.controls;
  }

  get rolesControl() {
    return this.saveForm.get('roles') as FormArray;
  }

  backClicked() {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;
    if (this.selectForm.valid) {
      this.loading = true;
      this.adminService.getAdminData(this.selectForm.value.id).pipe(
        tap(data => {
          this.id = data.data.id;
          this.data = data.data;
          this.loading = false;
        }, err => {
          this.error = err;
          this.loading = false;
        }), switchMap(
          () => this.http.get<any>(environment.apiUrl + '/role')
        ), tap(data => {
          this.rolesData = data.data;
          console.log(this.data);
          const formArray = this.saveForm.get('roles') as FormArray;
          this.rolesData.forEach(role => {
            const roleExist = this.data.roles.some(r => r.id === role.id);
            const control = this.fb.control(roleExist);
            formArray.push(control);
          });
        })
      ).subscribe();
    } else {
      return;
    }
  }

  save() {
    const roles = this.rolesControl.value.reduce((a, c, i) => {
      if (!c) {
        return a;
      }
      return [...a, this.rolesData[i]?.id];
    }, []);
    this.http.put<any>(environment.apiUrl + '/user/update/role', {userId: this.id, roles}).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
