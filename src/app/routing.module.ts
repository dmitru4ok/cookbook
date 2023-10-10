import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";


const appRoutes: Routes = [
    {path: '', redirectTo: 'recipes', pathMatch: 'full'},
    {path: 'recipes', loadChildren: () => import('./recipe/recipes.module').then(module => module.RecipesModule)},
    {path: 'shopping-list', loadChildren: () => import('./ShoppingList/shopping-list.module').then(module => module.ShoppingListModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)}
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class RoutingModule {}