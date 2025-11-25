import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { AdminPageHeader } from '@src/app/features/admin-page/components/admin-page-header/admin-page-header.component';
import { MatActionList, MatListItem } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarLink } from '@src/app/core/model/types.model';

@Component({
  selector: 'app-layout',
  imports: [
    AdminPageHeader,
    MatActionList,
    MatButton,
    MatIcon,
    MatListItem,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  links = input<SidebarLink[]>([]);
  expanded = signal(false);

  toggleSidenav() {
    this.expanded.set(!this.expanded());
  }

  sidenavClass = computed(() => (this.expanded() ? 'sidenav-expanded' : 'sidenav-collapsed'));

  sidenavContentClass = computed(() =>
    this.expanded() ? 'sidenav-content-expanded' : 'sidenav-content-collapsed',
  );
}
