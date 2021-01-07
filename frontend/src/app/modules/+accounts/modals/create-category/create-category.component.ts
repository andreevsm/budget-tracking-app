import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AccountActions, INewCategory } from 'src/app/core/store';
import { parseDateToString } from 'src/app/utils';

@Component({
  selector: 'bg-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCategoryComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    const { name, color } = this.form.getRawValue();

    const category: INewCategory = {
      name,
      color,
      createdAt: parseDateToString(new Date()),
    };

    console.log(category);

    this.store.dispatch(new AccountActions.AddCategory(category));
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]],
    });
  }
}
