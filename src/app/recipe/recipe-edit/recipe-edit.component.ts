import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

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
    private recipeService: RecipeService, 
    private router: Router,
    private dataService: DataStorageService) {}

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
      this.recipeService.updateRecipe(this.id, this.RecipeForm.value)
    } else {
      this.recipeService.addRecipe(this.RecipeForm.value);
    }
    this.dataService.storeRepices();
    this.recipeService.recipesUpdated.next();
    this.onNavigateAway();
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredientforms = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getById(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingr of recipe.ingredients) {
          recipeIngredientforms.push(new FormGroup({
            'name': new FormControl(ingr.name, Validators.required),
            'amount': new FormControl(ingr.amount, [Validators.required, Validators.min(0)])
          }));
        }
      }
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
