import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Border } from '../../../xpr/form-inputs/src/css/border';
import { Borders } from '../../../xpr/form-inputs/src/css/borders';
import { Size } from '../../../xpr/form-inputs/src/css/size';
import { JsonPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'xpr-inputs',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Border,
    Borders,
    Size,
    JsonPipe,
    UpperCasePipe
  ],
  template: `
    <h1>Inputs</h1>
  `,
  styles: [`
    main {
      display: flex;
    }
  `],
})
export class Inputs {

}
