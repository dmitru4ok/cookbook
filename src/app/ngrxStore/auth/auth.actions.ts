import { createAction, props } from "@ngrx/store";
import { User } from "src/app/auth/user.model";

export const authenticateSuccess = createAction(
    '[auth] login',
    props<{ 
        user: User,
        redirect: boolean
    }>()
);

export const logout = createAction(
    '[auth] logout'
);

export const loginRequestStart = createAction(
    '[auth] requestStart',
    props<{values: {email: string, password: string}}>()
);

export const authenticateError = createAction(
    '[auth] requestError',
    props<{authError: {message: string}}>()
);

export const signupRequestStart = createAction(
    '[auth] signupStart',
    props<{values: {email: string, password: string}}>()
);

export const clearError = createAction(
    '[auth] clearError'
);

export const autoLogin = createAction(
    '[auth] autoLogin'
);