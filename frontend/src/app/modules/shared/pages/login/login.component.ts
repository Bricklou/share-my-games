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

  public constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)],
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
  }

  protected onSubmit(): void {
    //
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
