import { Component, OnInit, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Store } from '@ngrx/store';
import { addMultipleIngredients } from 'src/app/ngrxStore/shopping-list/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  private route: ActivatedRoute; 
  private recipeService: RecipeService;
  private router: Router;
  private dataService: DataStorageService;
  private store: Store;
  constructor () {
    this.route = inject(ActivatedRoute);
    this.recipeService = inject(RecipeService);
    this.router = inject(Router);
    this.dataService = inject(DataStorageService);
    this.store = inject(Store);
    
  }
  
  ngOnInit(): void { 
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipeDetail = this.recipeService.getById(this.id);
    });
  }

  addToShoppingList() {
    this.store.dispatch(addMultipleIngredients(
      {newItems: this.recipeDetail.ingredients})
    );
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id); 
    this.dataService.storeRepices();
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
