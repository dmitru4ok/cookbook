import { Component, EventEmitter, Input } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    @Input({required: true}) message: string;
    closeEvent = new EventEmitter<void>();
}