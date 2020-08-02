import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public loggingIn = false;
  public submitted = false;
  public loginForm: FormGroup;
  public error = '';
  public loading = false;

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(60),
          Validators.minLength(3),
          Validators.email
        ],
      ],
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(60),
        ],
      ],
    });
  }

  get LoginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.login();
    } else {
      return;
    }
  }

  async login() {
    this.loading = true;
    try {
      this.loggingIn = true;
      const user = await this.authService.login(this.loginForm.value.email, this.loginForm.value.pass);
      this.authService.currentUserSubject.next(user);
      this.router.navigate(['/']);
    } catch (err) {
      this.loggingIn = false;
      this.loading = false;
      this.error = err;
    }
  }

}
