import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


const slRoutes: Routes = [
    {path: '', component: ShoppingListComponent},
];

@NgModule({
    imports: [RouterModule.forChild(slRoutes)]
})
export class ShoppingListRoutingModule {}