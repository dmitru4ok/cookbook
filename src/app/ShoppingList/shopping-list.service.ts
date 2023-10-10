import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[];
  ingredientsChanged = new Subject<void>();
  passIngredientToEdit = new Subject<number>();

  constructor() {
    this.ingredients = [
      new Ingredient('apples', 10),
      new Ingredient('tomatoes', 5)
    ];
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    this.ingredientsChanged.next();
  }

  addIngredientready(ingr: Ingredient) {
    this.ingredients.push(ingr);
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientById(id: number) {
    return this.ingredients.at(id);
  }

  updateIngredient(id: number, newName: string, newAmount: number) {
    this.ingredients[id].name = newName;
    this.ingredients[id].amount = newAmount;
  }

  deleteItem(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next();
  }
}
