import { createAction, props } from "@ngrx/store";
import { Recipe } from "src/app/recipe/recipe.model";

export const setRecipes = createAction(
    '[recipes] set-recipes',
    props<{payload: {newRecipes: Array<Recipe>}}>()
);

export const addRecipe = createAction(
    '[recipes] add-recipe',
    props<{recipe: Recipe}>()
);

export const updateRecipe = createAction(
    '[recipes] update-recipe',
    props<{payload: {index: number, newRecipe: Recipe}}>() 
);

export const deleteRecipe = createAction(
    '[recipes] delete-recipe',
    props<{index: number}>()
);

export const fetchRecipes = createAction(
    '[recipes] fetch-recipes',
);