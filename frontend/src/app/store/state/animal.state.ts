import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AddAnimal } from '../actions';

interface IAnimalModel {
  name: string;
}

@State<IAnimalModel>({
  name: 'animals',
  defaults: {
    name: '',
  },
})
@Injectable()
export class AnimalsState {
  @Action(AddAnimal)
  addAnimal(ctx: StateContext<IAnimalModel>, { name }: IAnimalModel) {
    console.log('ctx', ctx);
    console.log('data', name);
    const state = ctx.getState();

    ctx.setState({
      ...state,
      name,
    });
  }
}
