import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AdminPageService } from '@src/app/features/admin-page/services/admin-page.service';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatActionList, MatListItem } from '@angular/material/list';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

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
  ],
})
export class AdminPage {
  adminPageService = inject(AdminPageService);
  expanded = signal(false);
  private router = inject(Router);

  toggleSidenav = () => this.expanded.set(!this.expanded());

  onLogout() {
    this.adminPageService.logout().subscribe({
      next: () => {
        this.router.navigate(['/authenticate']);
      },
    });
  }
}
