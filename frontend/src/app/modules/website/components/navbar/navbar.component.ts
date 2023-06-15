import { Component } from '@angular/core';

interface NavItem {
  label: string;
  path: string;
  exact?: boolean;
  mobileOnly?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  protected appName = 'Sharing My Games';

  protected navItems: NavItem[] = [
    { label: 'Home', path: '/', exact: true, mobileOnly: true },
    { label: 'Games', path: '/games' },
    { label: 'Tags', path: '/tags' },
  ];
}
