import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    @Input({required: true}) message: string;
    @Output() closeEvent = new EventEmitter<void>();

}