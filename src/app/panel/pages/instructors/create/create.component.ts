import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public selectedUser = null;
  public userSelectForm: FormGroup;
  public error = '';
  public submitted = false;
  public loading = false;

  public createInstructorForm: FormGroup;
  public error2 = '';
  public submitted2 = false;
  public loading2 = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userSelectForm = this.fb.group({
      userid: [
        '',
        [Validators.required]
      ]
    });

    this.createInstructorForm = this.fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'),
        ]
      ],
      expertise: [
        '',
        [
          Validators.required,
          Validators.maxLength(60)
        ]
      ],
      maxStudents: [
        '',
        [
          Validators.required,
          Validators.pattern('^[1-9][0-9]*0$')
        ]
      ],
      weekdays: [
        false
      ],
      weekend: [
        false
      ],
      morning: [
        false
      ],
      afternoon: [
        false
      ],
      evening: [
        false
      ],
      linkedin: [
        '',
        [
          Validators.minLength(10),
          Validators.pattern('^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$')
        ]
      ],
      facebook: [
        '',
        [
          Validators.minLength(10)
        ]
      ],
      twitter: [
        '',
        [
          Validators.minLength(10)
        ]
      ],
      instagram: [
        '',
        [
          Validators.minLength(10)
        ]
      ],
    });
  }

  get userFormControl() {
    return this.userSelectForm.controls;
  }

  goBack() {
    this.location.back();
  }

  selectUser() {
    this.submitted = true;
    if (this.userSelectForm.valid) {
      this.loading = true;
      this.http.get<any>(environment.apiUrl + '/user/' + this.userSelectForm.value.userid).subscribe(
        ({data}) => {
          this.selectedUser = data;
          this.loading = false;
        },
        err => {
          this.loading = false;
          this.error = err;
        }
      );
    }
  }

  createInstructor() {
    console.log(this.createInstructorForm.value);
  }

}
