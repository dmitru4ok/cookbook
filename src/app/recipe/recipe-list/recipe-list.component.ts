import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';
import { AppState } from 'src/app/ngrxStore/app.reducer';
import { recipeSelector } from 'src/app/ngrxStore/recipes/recipe.selectors';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable <Recipe[]>;

  constructor(
    private router: Router, 
    private store: Store<AppState>) {}
  
  ngOnInit(): void {
    this.recipes$ = this.store.select(recipeSelector);  
  }

  onGoToNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }
}
