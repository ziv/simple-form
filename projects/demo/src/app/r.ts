import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'demo-r',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet/>'
})
export class R {

}
