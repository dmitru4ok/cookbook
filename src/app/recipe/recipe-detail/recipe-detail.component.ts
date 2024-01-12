import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addMultipleIngredients } from 'src/app/ngrxStore/shopping-list/shopping-list.actions';
import { AppState } from 'src/app/ngrxStore/app.reducer';
import { indexRecipeSelector } from 'src/app/ngrxStore/recipes/recipe.selectors';
import { Subscription, switchMap, tap } from 'rxjs';
import { deleteRecipe } from 'src/app/ngrxStore/recipes/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeDetail: Recipe;
  id: number;
  storageSubs: Subscription;

  private route: ActivatedRoute; 
  private router: Router;
  
  constructor (private store: Store<AppState>) {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
  }
  
  ngOnInit(): void { 
    this.storageSubs = this.route.params.pipe(
      tap((params: Params) => this.id = +params.id),
      switchMap(() => this.store.select(indexRecipeSelector(this.id))))
      .subscribe((data) => this.recipeDetail = data);
  }

  addToShoppingList() {
    this.store.dispatch(addMultipleIngredients(
      {newItems: this.recipeDetail.ingredients})
    );
  }

  onDeleteRecipe() {
    this.store.dispatch(deleteRecipe({index: this.id}));
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.storageSubs.unsubscribe();
  }
}
