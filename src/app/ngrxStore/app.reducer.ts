import { ActionReducerMap } from "@ngrx/store"
import { AuthState, authReducer } from "./auth/auth.reducer"
import { ShoppingListState, shoppingListReducer } from "./shopping-list/shopping-list.reducer"

export type AppState = {
    shoppingList: ShoppingListState,
    auth: AuthState
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: authReducer,
    shoppingList: shoppingListReducer
};