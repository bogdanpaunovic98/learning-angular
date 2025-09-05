import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '@src/app/shared/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'app-loader.component.html',
  styleUrl: 'app-loader.component.scss',
})
export class AppLoaderComponent {
  loadingService = inject(LoadingService);
}
