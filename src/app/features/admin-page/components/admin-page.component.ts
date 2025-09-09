import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AdminPageService } from '@src/app/features/admin-page/services/admin-page.service';

@Component({
  selector: 'admin-page',
  standalone: true,
  templateUrl: 'admin-page.component.html',
  imports: [MatButtonModule],
})
export class AdminPage {
  adminPageService = inject(AdminPageService);

  onLogout() {
    this.adminPageService.logout().subscribe({
      next: (response: string) => {
        console.log('Logged out');
      },
      error: (error: Object) => {
        console.log('Error happened', error);
      },
    });
  }
}
