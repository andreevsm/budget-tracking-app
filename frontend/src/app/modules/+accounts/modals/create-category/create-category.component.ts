import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CategoryActions, INewCategory } from '@core/store';

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

  public onSubmit(): void {
    const { name, color } = this.form.getRawValue();

    const category: INewCategory = {
      name,
      color,
      createdAt: new Date(),
    };

    this.store.dispatch(new CategoryActions.Add(category));
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]],
    });
  }
}
