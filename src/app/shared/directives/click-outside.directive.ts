import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[appClickOutside]'
})
export class ClickedOutsideDirective {

    constructor(private el: ElementRef) { }

    @Output() public clickedOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(target: any) {
        const clickedinside = this.el.nativeElement.contains(target);
        if (!clickedinside) {
            this.clickedOutside.emit(target);
        }
    }

}