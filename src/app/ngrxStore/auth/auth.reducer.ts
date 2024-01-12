import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/auth/user.model";
import { authenticateSuccess, logout, loginRequestStart, authenticateError, signupRequestStart, clearError } from "./auth.actions";


export type AuthState = {
    user: User,
    loading: boolean,
    error: string
}

const initialState: AuthState = {
    user: null,
    error: null,
    loading: false
};

export const authReducer = createReducer(
    initialState,
    on(authenticateSuccess, (state, action) => {
        return {...state, user: action.user};
    }),
    on(logout, () => {
        return {user: null, loading: false, error: null};
    }),
    on(loginRequestStart, signupRequestStart, (state) => {
        return {...state, loading: true, error: null}
    }),
    on(authenticateError, (state, action) => {
        return {user: null, loading: false, error: action.authError.message}
    }),
    on(clearError, (state) => {
        return {...state, error: null};
    })
);