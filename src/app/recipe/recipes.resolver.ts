import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Recipe } from './recipe.model';
import { AppState } from '../ngrxStore/app.reducer';
import { Store } from '@ngrx/store';
import { fetchRecipes, setRecipes } from '../ngrxStore/recipes/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';
import { recipeSelector } from '../ngrxStore/recipes/recipe.selectors';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const store: Store<AppState> = inject(Store<AppState>);
  const actions$ = inject(Actions);
  return store.select(recipeSelector)
  .pipe(
    take(1),
    switchMap((recipes) => {
      if (recipes.length === 0) {
        store.dispatch(fetchRecipes());
        return actions$.pipe(
            ofType(setRecipes), 
            map(action => action.payload.newRecipes),
            take(1));
      } else {
        return of(recipes);
      }
    })
  );
 


};
