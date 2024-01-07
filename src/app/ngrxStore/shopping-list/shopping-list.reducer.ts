import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { addIngredient, addMultipleIngredients, deleteIngredient, startEdit, stopEdit, updateIngredient } from "./shopping-list.actions";

export type ShoppingListState = {
    ingredients: Ingredient[],
    editedItemIndex: number,
    editedItem: Ingredient
};

const initialShoppingListState = {
    ingredients: [ 
    new Ingredient('apples', 10),
    new Ingredient('tomatoes', 5)
    ],
    editedItemIndex: -1,
    editedItem: null
};

export const shoppingListReducer = createReducer(
    initialShoppingListState,

    on(addIngredient, (state, action) => {
        return {...state, ingredients: [...state.ingredients, action.newItem]}
    }),
    on(addMultipleIngredients, (state, action) => {
        return {...state, ingredients: [...state.ingredients, ...action.newItems]}
    }), 
    on(updateIngredient, (state, action) => {
        const updatedIngrdients = [...state.ingredients];
        updatedIngrdients[state.editedItemIndex] = action.updatedItem;
       return {ingredients: updatedIngrdients, editedItem: null, editedItemIndex: -1};
    }),
    on(deleteIngredient, (state) => {
        return {ingredients: state.ingredients.filter((ingr, index) => index !== state.editedItemIndex), 
            editedItem: null, editedItemIndex: -1};
    }),
    on(startEdit, (state, action) => {
        return {...state, editedItemIndex: action.index, editedItem: state.ingredients[action.index]}
    }),
    on(stopEdit, (state) => {
        return {...state, editedItemIndex: -1, editedItem: null}
    }),
);