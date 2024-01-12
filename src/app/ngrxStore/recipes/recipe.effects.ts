import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addRecipe, deleteRecipe, fetchRecipes, setRecipes, updateRecipe } from "./recipe.actions";
import { map, switchMap, withLatestFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "src/app/recipe/recipe.model";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";


@Injectable()
export class RecipeEffects {
    private static url = 'https://angular-demo-c0d91-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

    fetchRecipes = createEffect(
        () => this.actions$.pipe(
            ofType(fetchRecipes),
            switchMap(() => {
                return this.http.get<Recipe[]>(RecipeEffects.url).pipe(
                    map(response => {
                        return  response ? response.map((recipe) => {
                            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                        }) : [];
                    })
                );
            }),
            map(recipes => setRecipes({payload: {newRecipes: recipes}}))
        )
    );

    storeRecipes = createEffect(
        () => this.actions$.pipe(
            ofType(deleteRecipe, updateRecipe, addRecipe),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, recipes]) => {
                return this.http.put<Recipe[]>(RecipeEffects.url, recipes.recipes);
            })
        ),
        {dispatch: false}
    );

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<AppState>){}
}