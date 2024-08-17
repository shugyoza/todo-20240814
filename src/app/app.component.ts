import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutPipe } from './shared/pipes/layout/layout.pipe';
import { AsyncPipe, JsonPipe } from '@angular/common';

import { context } from './constants/layout.constants';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, LayoutPipe, AsyncPipe, JsonPipe],
})
export class AppComponent {
  title = 'todo';
  context = context;
}
