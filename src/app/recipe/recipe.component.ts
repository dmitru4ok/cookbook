import { Component } from '@angular/core';
import { Recipe } from './recipe.model';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  providers: []
})
export class RecipeComponent{
  selectedRecipe: Recipe;

  constructor() {}
}
