import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  recipeChangedSubscription: Subscription;
  constructor(private recipeService: RecipeService, private router: Router, private dataService: DataStorageService) {}

  ngOnInit(): void {
    this.dataService.fetchRecipes();
    this.recipes = this.recipeService.recipesArr();
    this.recipeChangedSubscription = this.recipeService.recipesUpdated.subscribe(
      () => {
        this.recipes = this.recipeService.recipesArr();
    }); 
  }

  onGoToNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }
}
