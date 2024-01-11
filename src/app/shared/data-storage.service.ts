import { Injectable } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe/recipe.model';
import { map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrxStore/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private recipeservice: RecipeService, 
    private http: HttpClient) {}

  private static url = 'https://angular-demo-c0d91-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  
  public storeRepices() {
    const recipes = this.recipeservice.recipesArr();
    this.http.put<Recipe[]>(DataStorageService.url, recipes).subscribe(
      {
        complete: () => this.fetchRecipes().subscribe()
      });
  }

  public fetchRecipes() {
    return this.http.get<Recipe[]>(DataStorageService.url)
    .pipe(
      map(recipes => { 
        if (recipes) {
          return recipes.map(item => {
            return {...item, ingredients: item.ingredients ? item.ingredients : []}
          })
        }
        return [];
     
    }), 
      tap(data => this.recipeservice.setRecipes(data))
    );
  }
}
