import { createReducer, on } from "@ngrx/store";
import { Recipe } from "src/app/recipe/recipe.model";
import * as RecipeActions from "./recipe.actions";

export type RecipesState = {
    recipes: Array<Recipe>
};

const initialState: RecipesState = {recipes: []};

export const recipesReducer = createReducer<RecipesState>(
    initialState,
    on(RecipeActions.addRecipe, (state, action) => {
        return {...state, recipes: [...state.recipes, action.recipe]};
    }),
    on(RecipeActions.deleteRecipe, (state, action) => {
        const arrayWithDeletion = [...state.recipes];
        arrayWithDeletion.splice(action.index, 1);
        return {...state, recipes: arrayWithDeletion};
    }),
    on(RecipeActions.setRecipes, (state, action) => {
        return {...state, recipes: [...action.payload.newRecipes]};
    }),
    on(RecipeActions.updateRecipe, (state, action) => {
        const recipesArr = [...state.recipes];
        recipesArr[action.payload.index] = {...action.payload.newRecipe, 
            ingredients: [...action.payload.newRecipe.ingredients]};
        return {...state,  recipes: recipesArr};
    }),
    on(RecipeActions.fetchRecipes, (state) => {
        return {...state};
    })
);