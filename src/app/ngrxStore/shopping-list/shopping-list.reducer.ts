import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { addIngredient } from "./shopping-list.actions";

const initialShoppingListState = [ 
    new Ingredient('apples', 10),
    new Ingredient('tomatoes', 5)
];

export const shoppingListReducer = createReducer(
    initialShoppingListState,
    on(addIngredient, (state, action) => [...state, action.newItem])
);