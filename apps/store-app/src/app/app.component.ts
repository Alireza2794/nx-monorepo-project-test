import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({ opacity: 0, scale: 0.7 }),
        animate('400ms ease-in', style({ opacity: 1, scale: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'store-app';
}
