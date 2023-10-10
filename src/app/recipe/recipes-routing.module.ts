import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeComponent } from "./recipe.component";
import { recipesResolver } from "./recipes.resolver";
import { authGuard } from "../auth/auth.guard";
import { ChooseComponent } from "./choose-recipe.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const recipeRoutes: Routes = [
    {
        path: '', 
        component: RecipeComponent, 
        resolve: [recipesResolver], 
        canActivate: [authGuard],
        children: [
            {path: '', component: ChooseComponent, pathMatch: 'full'},
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent},
            {path: ':id/edit', component: RecipeEditComponent}]
    },
];

@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}