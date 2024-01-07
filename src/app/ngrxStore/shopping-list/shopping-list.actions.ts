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
    props<{updatedItem: Ingredient}>()
);

export const deleteIngredient = createAction(
    '[sh-list] delete-ingredient',
);

export const startEdit = createAction(
    '[sh-list] start-edit',
    props<{index: number}>()
);

export const stopEdit = createAction(
    '[sh-list] stop-edit',
);