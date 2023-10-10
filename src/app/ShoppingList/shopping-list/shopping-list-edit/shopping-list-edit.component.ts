import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
  constructor(private slService: ShoppingListService) {}

  @ViewChild('addIngrForm') myForm: NgForm;
  editIngrSubscription: Subscription;
  editMode: boolean = false;
  editIndex: number;

  addIngredient(form: NgForm) {
    if (this.editMode) {
      this.saveEditedChanges();
    } else {
      this.slService.addIngredient(form.value['name'], form.value['amount']);
      form.reset();
    }
  }

  ngOnInit(): void {
    this.editIngrSubscription = this.slService.passIngredientToEdit.subscribe((value: number) => {
      const ingredient = this.slService.getIngredientById(value);
      this.editIndex = value;
      this.editMode = true;
      this.myForm.setValue({
        'name': ingredient.name,
        'amount': ingredient.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.editIngrSubscription.unsubscribe();
  }

  saveEditedChanges() {
    this.slService.updateIngredient(this.editIndex, this.myForm.value['name'], +this.myForm.value['amount']);
    this.onClear();
  }

  onClear() {
    this.myForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteItem(this.editIndex);
    this.onClear();
  }
}
