import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLoaderComponent } from '@src/app/shared/components/app-loader/app-loader.component';

@Component({
  selector: 'app-root',

  templateUrl: './app.html',
  imports: [RouterOutlet, AppLoaderComponent],
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('learning-angular');
}
