import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'xpr-group',
  standalone: true,
  template: ''
})
export class Group {
  @Input() f?: FormGroup;
}
