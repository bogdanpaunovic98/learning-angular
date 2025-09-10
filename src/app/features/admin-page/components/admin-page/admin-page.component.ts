import { Component, signal, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatActionList, MatListItem } from '@angular/material/list';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminPageHeader } from '@src/app/features/admin-page/components/admin-page-header/admin-page-header.component';

@Component({
  selector: 'admin-page',
  standalone: true,
  templateUrl: 'admin-page.component.html',
  styleUrl: 'admin-page.component.scss',
  imports: [
    MatButtonModule,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatActionList,
    MatListItem,
    NgClass,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    AdminPageHeader,
  ],
})
export class AdminPage {
  expanded = signal(false);

  toggleSidenav() {
    this.expanded.set(!this.expanded());
  }

  sidenavClass = computed(() => (this.expanded() ? 'sidenav-expanded' : 'sidenav-collapsed'));

  sidenavContentClass = computed(() =>
    this.expanded() ? 'sidenav-content-expanded' : 'sidenav-content-collapsed',
  );
}
