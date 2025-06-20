import { Component } from '@angular/core';

import { MethodsComponent } from './core/methods/methods.component';
import { SectionsComponent } from './core/sections/sections.component';

@Component({
  imports: [SectionsComponent, MethodsComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {}
