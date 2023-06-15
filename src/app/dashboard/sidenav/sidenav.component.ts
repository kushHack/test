import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { navbarData } from '../../shared/config/side-nav.data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms',
          style({ opacity: 1 })
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  public collapsed = true;
  public screenWidth = 0;
  public navData = navbarData;
  public menu = 'height-0';
  public userRole: string = '';
  public userName: string = '';
  public userEmail: string = '';

  constructor(private authService: AuthService, private route: Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let url = event.url.split('?')[0];
        this.toggleRouteBased(url)
      }
    })
  }

  @HostListener('window:resize', ['$event'])

  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
    if (this.screenWidth > 768) {
      this.collapsed = true;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  toggleMenu(index: number) {
    this.navData[index].collapsed = !this.navData[index].collapsed
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUser('role');
    this.userName = this.authService.getUser('name');
    this.userEmail = this.authService.getUser('email');
    this.screenWidth = window.innerWidth;
  }

  toggleRouteBased(route: string) {
    if (route.match('/dashboard/forecast')) {
      this.navData[2].collapsed = false;
      this.navData[3].collapsed = true;
      this.navData[1].collapsed = true;
      return;
    }
    if (route.match('/dashboard/workflow')) {
      this.navData[3].collapsed = false;
      this.navData[2].collapsed = true;
      this.navData[1].collapsed = true;
      return;
    }
    if (route.match('/dashboard/master-data-setup')) {
      this.navData[1].collapsed = false;
      this.navData[2].collapsed = true;
      this.navData[3].collapsed = true;
      return;
    }
    this.navData[2].collapsed = true;
    this.navData[3].collapsed = true;
  }

  logout() {
    this.authService.logout();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}
