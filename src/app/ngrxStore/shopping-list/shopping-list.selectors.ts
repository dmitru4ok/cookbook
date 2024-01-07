import { createSelector } from "@ngrx/store";
import { AppState } from "../app.reducer";

export const ingredientsSelector = (state: AppState) => state.shoppingList.ingredients;

export const indexIngredientSelector = (index) => createSelector(
    ingredientsSelector,
    (ingredients) => ingredients[index]
);