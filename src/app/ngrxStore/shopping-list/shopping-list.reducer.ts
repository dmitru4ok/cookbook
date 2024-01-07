import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { addIngredient, addMultipleIngredients, deleteIngredient, updateIngredient } from "./shopping-list.actions";

const initialShoppingListState = [ 
    new Ingredient('apples', 10),
    new Ingredient('tomatoes', 5)
];

export const shoppingListReducer = createReducer(
    initialShoppingListState,
    on(addIngredient, (state, action) => [...state, action.newItem]),
    on(addMultipleIngredients, (state, action) => [...state, ...action.newItems]), 
    on(updateIngredient, (state, action) => {
       const newState = [...state];
       newState[action.index] = action.newItem;
       return newState;
    }),
    on(deleteIngredient, (state, action) => {
        return state.filter((elem, ind) => ind !== action.index);
    })
);