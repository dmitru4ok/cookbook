import { Component, EventEmitter, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ingredientsSelector } from 'src/app/ngrxStore/shopping-list/shopping-list.selectors';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;
  changeIndex: {value: number};

  constructor(private store: Store<{shoppingList: Ingredient[]}>) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select(ingredientsSelector);
  }

  onItemSelected(id: number) {
    this.changeIndex = {value: id};
  }
}
