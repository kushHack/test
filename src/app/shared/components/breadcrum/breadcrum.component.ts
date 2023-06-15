import { Component, Input } from '@angular/core';

@Component({
  selector: 'breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent {

  @Input() heading: string = '';

  constructor() { }

}
