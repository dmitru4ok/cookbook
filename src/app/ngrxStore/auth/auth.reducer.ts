import { createReducer } from "@ngrx/store";
import { User } from "src/app/auth/user.model";


export type AuthState = {
    user: User
}

const initialState = {
    user: null
};

export const authReducer = createReducer(
    initialState
);