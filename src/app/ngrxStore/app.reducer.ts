import { ActionReducerMap } from "@ngrx/store"
import { AuthState, authReducer } from "./auth/auth.reducer"
import { ShoppingListState, shoppingListReducer } from "./shopping-list/shopping-list.reducer"
import { RecipesState, recipesReducer } from "./recipes/recipe.reducer"

export type AppState = {
    shoppingList: ShoppingListState,
    auth: AuthState,
    recipes: RecipesState
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: authReducer,
    shoppingList: shoppingListReducer,
    recipes: recipesReducer
};