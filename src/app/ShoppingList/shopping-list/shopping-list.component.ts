import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingrChangedSubs: Subscription;
  ingredients$: Observable<Ingredient[]>;

  constructor(private store: Store<{shoppingList: Ingredient[]}>) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');
  }

  onItemSelected(id: number) {
    // this.slService.passIngredientToEdit.next(id);
  }
}
