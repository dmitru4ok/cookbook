import { NgModule } from "@angular/core";
import { AuthComponent } from "../auth/auth.component";
import { SpinnerComponentComponent } from "../spinner-component/spinner-component.component";
import { AlertComponent } from "../alert/alert.component";
import { PlaceholderDirective } from "./placeholder.directive";
import { CommonModule } from "@angular/common";
import { DropdownDirective } from "./dropdown.directive";

@NgModule({
    declarations: [ 
        SpinnerComponentComponent,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [CommonModule],
    exports: [
        CommonModule,
        AlertComponent,
        SpinnerComponentComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
})
export class SharedModule {}