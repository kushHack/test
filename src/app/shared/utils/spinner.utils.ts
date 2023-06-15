import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SpinnerService {

    @Output() loading = new EventEmitter();
    @Output() alert = new EventEmitter();
    @Output() spinner2 = new EventEmitter();

    change(value: boolean) {
        this.loading.emit(value);
    }

    getEmittedValue() {
        return this.loading;
    }

    showAlert(value: string, type: string) {
        let data = { value, type }
        this.alert.emit(data);
    }

    getEmittedText() {
        return this.alert;
    }

    showSpinner2(value: boolean) {
        this.spinner2.emit(value);
    }

    getSpinner2(){
        return this.spinner2;
    }
}