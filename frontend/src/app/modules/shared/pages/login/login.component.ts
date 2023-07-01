import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

interface UserLoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
  remember: FormControl<boolean>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  protected loginForm: FormGroup<UserLoginForm>;

  private readonly userSub$?: Subscription;
  private loginSub$?: Subscription;

  protected errors: string[] = [];

  public constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });

    this.userSub$ = this.authService.isAuthenticated
      .pipe(distinctUntilChanged())
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.redirectNextUrl();
        }
      });
  }

  public ngOnDestroy(): void {
    this.userSub$?.unsubscribe();
    this.loginSub$?.unsubscribe();
  }

  protected onSubmit(): void {
    this.errors = [];

    // Process login data
    if (this.loginForm.invalid) {
      return;
    }

    const value = this.loginForm.value;
    if (!value.email || !value.password || !value.remember) {
      return;
    }

    this.loginSub$ = this.authService
      .login({
        email: value.email,
        password: value.password,
        remember: value.remember,
      })
      .subscribe({
        next: (loggedIn) => {
          if (!loggedIn) return;

          this.redirectNextUrl();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  protected get formControls(): UserLoginForm {
    return this.loginForm.controls;
  }

  private redirectNextUrl(): Subscription {
    return this.route.queryParamMap.subscribe((params) => {
      const nextUrl = params.get('next') ?? '/';
      void this.router.navigate([nextUrl]);
    });
  }
}
