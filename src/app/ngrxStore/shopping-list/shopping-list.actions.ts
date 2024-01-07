import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const addIngredient = createAction(
    '[sh-list] add-ingredient',
    props<{newItem: Ingredient}>()
);

export const addMultipleIngredients = createAction(
    '[sh-list] add-mult-ingredients',
    props<{newItems: Ingredient[]}>()
);

export const updateIngredient = createAction(
    '[sh-list] update-ingredient',
    props<{index: number, newItem: Ingredient}>()
);

export const deleteIngredient = createAction(
    '[sh-list] delete-ingredient',
    props<{index: number}>()
);