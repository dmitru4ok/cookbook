import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const addIngredient = createAction(
    '[sh-list] add-ingredient',
    props<{newItem: Ingredient}>()
);