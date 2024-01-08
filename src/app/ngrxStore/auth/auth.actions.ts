import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[auth] login',
    props<{ 
        values: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date
        }
    }>()
);

export const logout = createAction(
    '[auth] logout',
);