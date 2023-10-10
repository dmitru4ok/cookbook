import { NgModule } from "@angular/core";
import { RecipeService } from "./recipe/recipe.service";
import { ShoppingListService } from "./ShoppingList/shopping-list.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth.interceptor";

@NgModule({
    providers: [
        RecipeService, 
        ShoppingListService, 
        {
          provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptor, 
          multi: true}
      ],
})
export class CoreModule {

}