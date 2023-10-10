import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const recipes = inject(RecipeService).recipesArr();
  if (recipes.length === 0) {
    return inject(DataStorageService).fetchRecipes();
  } 
  return recipes;
};
