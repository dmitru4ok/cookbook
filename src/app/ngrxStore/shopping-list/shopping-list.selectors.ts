import { createSelector } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ingredientsSelector = (state: {shoppingList: Ingredient[]}) => state.shoppingList;

export const indexIngredientSelector = (index) => createSelector(
    ingredientsSelector,
    (ingredients) => ingredients[index]
);