import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeComponent } from "./recipe.component";
import { ChooseComponent } from "./choose-recipe.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        RecipeComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        ChooseComponent,
        RecipeEditComponent,
    ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule {}