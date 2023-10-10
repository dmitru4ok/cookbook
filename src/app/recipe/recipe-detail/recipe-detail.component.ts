import { Component, OnInit, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/ShoppingList/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  private slService?: ShoppingListService;
  private route?: ActivatedRoute; 
  private recipeService?: RecipeService;
  private router?: Router;
  private dataService?: DataStorageService;
  constructor () {
    this.slService = inject(ShoppingListService);
    this.route = inject(ActivatedRoute);
    this.recipeService = inject(RecipeService);
    this.router = inject(Router);
    this.dataService = inject(DataStorageService);
    
  }
  
  ngOnInit(): void { 
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipeDetail = this.recipeService.getById(this.id);
    });
  }

  addToShoppingList() {
    for (let ingr of this.recipeDetail.ingredients) {
      this.slService.addIngredientready(ingr);
    }
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id); 
    this.dataService.storeRepices();
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
