import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { makeEntityByKey } from '@utils/helpers';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoryActions } from './category.action';
import { ICategory } from './category.interface';
import { CategoryService } from './category.service';

export interface ICategoryState {
  categoriesEntity: Record<number, ICategory>;
}

@State<ICategoryState>({
  name: 'category',
  defaults: {
    categoriesEntity: {},
  },
})
@Injectable()
export class CategoryState {
  constructor(private categoryService: CategoryService, private store: Store) {}

  @Selector()
  public static categories(state: ICategoryState): Record<number, ICategory> {
    return state.categoriesEntity;
  }

  @Selector()
  public static categoriesList(state: ICategoryState): ICategory[] {
    return Object.values(state.categoriesEntity);
  }

  @Action(CategoryActions.LoadAll)
  public loadAll({ setState, getState }: StateContext<ICategoryState>): Observable<ICategory[]> {
    return this.categoryService.loadAll().pipe(
      tap((categories) => {
        const categoriesEntity = makeEntityByKey(categories, (category) => category.id);

        setState({
          ...getState(),
          categoriesEntity,
        });
      }),
    );
  }

  @Action(CategoryActions.Add)
  public addCategory(
    { setState, getState }: StateContext<ICategoryState>,
    { category }: CategoryActions.Add,
  ): Observable<ICategory> {
    return this.categoryService.add(category).pipe(
      tap((newCategory) => {
        setState({
          ...getState(),
          categoriesEntity: {
            ...getState().categoriesEntity,
            [newCategory.id]: newCategory,
          },
        });
      }),
    );
  }

  @Action(CategoryActions.Delete)
  public deleteCategory(
    { setState, getState }: StateContext<ICategoryState>,
    { id }: CategoryActions.Delete,
  ): Observable<number> {
    return this.categoryService.delete(id).pipe(
      tap(() => {
        const categoriesEntity = { ...getState().categoriesEntity };
        const categories = Object.values(categoriesEntity).filter((category) => category.id !== id);

        setState({
          ...getState(),
          categoriesEntity: makeEntityByKey(categories, (category) => category.id),
        });
      }),
    );
  }
}
