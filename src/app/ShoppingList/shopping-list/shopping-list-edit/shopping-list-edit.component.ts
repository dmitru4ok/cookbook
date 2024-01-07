import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addIngredient, deleteIngredient, updateIngredient } from 'src/app/ngrxStore/shopping-list/shopping-list.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { indexIngredientSelector } from 'src/app/ngrxStore/shopping-list/shopping-list.selectors';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  constructor(private store: Store) {}

  @ViewChild('addIngrForm') myForm: NgForm;
  editMode: boolean = false;
  ingredientIndex: number;

  addIngredient() {
    if (this.editMode) {
      this.store.dispatch(
        updateIngredient({index: this.ingredientIndex, newItem: new Ingredient(this.myForm.value['name'], +this.myForm.value['amount'])})
      );
      this.onClear();
    } else {
      this.store.dispatch(addIngredient({newItem: {name: this.myForm.value['name'], amount: this.myForm.value['amount']}}));
      this.myForm.reset();
    }
  }

  @Input()
  set index(newData: {value: number}) {
    if (newData && newData.value !== null) {
      this.ingredientIndex = newData.value;
      this.store.select(indexIngredientSelector(newData.value)).subscribe(ingr => {
        this.editMode = true;
          this.myForm.setValue(ingr); 
      });
    }
  }

  protected onClear() {
    this.myForm.reset();
    this.editMode = false;
  }

  onDelete() {
   this.store.dispatch(deleteIngredient({index: this.ingredientIndex}));
    this.onClear();
  }
}
