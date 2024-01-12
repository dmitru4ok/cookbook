import { createSelector } from "@ngrx/store";
import { AppState } from "../app.reducer";

export const recipeSelector = ((state: AppState) => state.recipes.recipes);

export const indexRecipeSelector =  (index) => createSelector(
    recipeSelector,
    (recipes) => {
        return {...recipes[index]}
    }
);