import { INewCategory } from './category.interface';

export namespace CategoryActions {
  export class LoadAll {
    public static readonly type = '[Categories] Load Categories';
  }

  export class Delete {
    public static readonly type = '[Accounts] Delete Category';
    constructor(public id: number) {}
  }

  export class Add {
    public static readonly type = '[Accounts] Add Category';
    constructor(public category: INewCategory) {}
  }
}
