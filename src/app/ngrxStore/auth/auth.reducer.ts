import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/auth/user.model";
import { login, logout } from "./auth.actions";


export type AuthState = {
    user: User
}

const initialState = {
    user: null
};

export const authReducer = createReducer(
    initialState,
    on(login, (state, action) => {
        const user = new User(action.values.email, action.values.userId, 
            action.values.token, action.values.expirationDate);
        return {...state, user: user};
    }),
    on(logout, () => {
        return {user: null};
    })
);