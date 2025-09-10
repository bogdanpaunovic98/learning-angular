import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AdminPageService } from '@src/app/features/admin-page/services/admin-page.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-page-header',
  standalone: true,
  templateUrl: 'admin-page-header.component.html',
  styleUrl: 'admin-page-header.component.scss',
  imports: [MatButtonModule, MatIconModule],
})
export class AdminPageHeader {
  adminPageService = inject(AdminPageService);
  private router = inject(Router);

  onLogout() {
    this.adminPageService.logout().subscribe({
      next: () => {
        this.router.navigate(['/authenticate']);
      },
    });
  }
}
