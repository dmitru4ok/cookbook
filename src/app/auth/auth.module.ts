import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: AuthComponent}])
    ]
})
export class AuthModule {}