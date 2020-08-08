import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public selectedUser = null;
  public selectedUserId = null;
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
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSelectForm = this.fb.group({
      userid: [
        '',
        [Validators.required]
      ]
    });

    this.createInstructorForm = this.fb.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15)
        ]
      ],
      areaOfExpertise: [
        '',
        [
          Validators.required,
          Validators.maxLength(140)
        ]
      ],
      maxNoOfStudents: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(99999)
        ]
      ],
      weekday: [
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
      linkedinProfile: [
        null,
        [
          Validators.minLength(10),
        ]
      ],
      fbProfile: [
        null,
        [
          Validators.minLength(10)
        ]
      ],
      twitterProfile: [
        null,
        [
          Validators.minLength(10)
        ]
      ],
      instaProfile: [
        null,
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
          this.selectedUserId = data.id;
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
    if (this.createInstructorForm.invalid) {
      alert('Invalid');
      return;
    }
    const data = this.createInstructorForm.value;
    data.availability = ['weekday', 'weekend'].filter(day => !!data[day]).join(',');
    data.timing = ['morning', 'afternoon', 'evening'].filter(day => !!data[day]).join(',');
    data.userId = this.selectedUserId;
    this.http.post<any>(environment.apiUrl + '/instructor/create', data).subscribe(
      dat => {
        console.log(dat);
        this.router.navigate(['/instructors']);
      }, err => {
        console.log(err);
      }
    );
  }

}
