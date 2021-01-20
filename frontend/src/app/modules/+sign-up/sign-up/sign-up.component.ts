import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthActions } from '@core/store';

@Component({
  selector: 'bg-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;
  public isPasswordShown = false;

  constructor(private fb: FormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    const { login, email, password } = this.form.getRawValue();

    this.store.dispatch(
      new AuthActions.SignUp({
        login,
        email,
        password,
      }),
    );
  }
}
