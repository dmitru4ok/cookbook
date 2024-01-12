import { Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent {
    @Input({required: true}) id: number;
    @Input({required: true}) recipe: Recipe

    constructor() {}
}