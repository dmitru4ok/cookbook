import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  
  recipesUpdated = new Subject<void>();

  private recipes: Recipe[] = [];
    
  public recipesArr(): Array<Recipe> {
    return this.recipes.slice();
  }

  public getById(id: number): Recipe {
    return this.recipes.at(id);
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next();
  }

  public updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesUpdated.next();
  }

  public deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesUpdated.next();
  }

  setRecipes(newArr: Recipe[]) {
    this.recipes = newArr;
    this.recipesUpdated.next();
  }
}
