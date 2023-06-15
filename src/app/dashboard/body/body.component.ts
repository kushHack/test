import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = window.innerWidth;

  constructor(private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let element = document.getElementsByClassName('body');
        element[0].scrollTop = 0
      }
    })
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed) {
      if (this.screenWidth > 768) {
        styleClass = 'body-trimmed';
      }
      else {
        styleClass = 'body-md-screen'
      }
    }
    else if (!this.collapsed) {
      if (this.screenWidth <= 768 && this.screenWidth > 0) {
        styleClass = 'body-md-screen'
      }
      else {
        styleClass = 'body-md-screen'
      }
    }
    return styleClass;
  }
}
