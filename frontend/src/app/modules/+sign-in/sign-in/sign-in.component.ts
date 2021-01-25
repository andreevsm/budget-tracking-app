import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthActions } from '@core/store/auth';

@Component({
  selector: 'bg-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  public form: FormGroup;
  public isPasswordShown = false;

  constructor(private fb: FormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    const { email, password } = this.form.getRawValue();

    this.store.dispatch(
      new AuthActions.SignIn({
        email,
        password,
      }),
    );
  }
}
