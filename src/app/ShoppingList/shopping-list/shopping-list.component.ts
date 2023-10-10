import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrChangedSubs: Subscription;
  ingredients: Ingredient[];


  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.ingrChangedSubs = this.slService.ingredientsChanged.subscribe(() => {
      this.ingredients = this.slService.getIngredients();
    }); 
  }

  ngOnDestroy(): void {
    this.ingrChangedSubs.unsubscribe();
  }

  onItemSelected(id: number) {
    this.slService.passIngredientToEdit.next(id);
  }
}
