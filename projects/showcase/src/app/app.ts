import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'xpr-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <button routerLink="/debug">DEBUG</button>
      <button routerLink="/auto">AUTO</button>
    </nav>
    <router-outlet />`,
})
export class App {
}
