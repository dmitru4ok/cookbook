import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrxStore/app.reducer';
import { indexRecipeSelector } from 'src/app/ngrxStore/recipes/recipe.selectors';
import { addRecipe, updateRecipe } from 'src/app/ngrxStore/recipes/recipe.actions';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean = false;
  id: number;
  RecipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    const ingrArray: Ingredient[] = [];
    for (let ingr of this.ingredientArray.value) {
      ingrArray.push(new Ingredient(ingr['name'], ingr['amount']))
    }
    if (this.editMode) {
      this.store.dispatch(updateRecipe({payload: {index: this.id, newRecipe: this.RecipeForm.value}}))
    } else {
     this.store.dispatch(addRecipe({recipe: this.RecipeForm.value}));
    }
    this.onNavigateAway();
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredientforms = new FormArray([]);

    if (this.editMode) {
     const subs = this.store.select(indexRecipeSelector(this.id)).subscribe(
        (recipe) => {
          recipeName = recipe.name;
          recipeImgPath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe.ingredients) {
            recipe.ingredients.forEach((ingr) => {
              recipeIngredientforms.push(new FormGroup({
                'name': new FormControl(ingr.name, Validators.required),
                'amount': new FormControl(ingr.amount, [Validators.required, Validators.min(0)])
              }));
            })
          }    
        }
      );
      subs.unsubscribe();
    }

    this.RecipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredientforms
    });
  }

  get ingredientArray() {
    return (<FormArray>this.RecipeForm.get('ingredients'));
  }

  onAddIngredient() {
    this.ingredientArray.push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.min(0.001)])
    }));
  }

  onNavigateAway() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    this.ingredientArray.removeAt(index);
  }
}
