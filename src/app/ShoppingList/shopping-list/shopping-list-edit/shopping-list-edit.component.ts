import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/ngrxStore/app.reducer';
import { addIngredient, deleteIngredient, stopEdit, updateIngredient } from 'src/app/ngrxStore/shopping-list/shopping-list.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('addIngrForm') myForm: NgForm;
  editMode: boolean = false;
  storeSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store.select('shoppingList').subscribe(state => {
      if (state.editedItemIndex === -1) {
        this.editMode = false;
      } else {
        this.editMode = true;
        this.myForm.setValue(state.editedItem);
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(stopEdit());
    this.storeSubscription.unsubscribe();
  }

  addIngredient() {
    if (this.editMode) {
      this.store.dispatch(
        updateIngredient({updatedItem: new Ingredient(this.myForm.value['name'], +this.myForm.value['amount'])})
      );
      this.onClear();
    } else {
      this.store.dispatch(addIngredient({newItem: {name: this.myForm.value['name'], amount: this.myForm.value['amount']}}));
      this.myForm.reset();
    }
  }

  protected onClear() {
    this.myForm.reset();
    this.editMode = false;
    this.store.dispatch(stopEdit());
  }

  onDelete() {
   this.store.dispatch(deleteIngredient());
    this.onClear();
  }
}
