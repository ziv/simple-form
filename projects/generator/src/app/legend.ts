import { Directive, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: 'legend',
  standalone: true
})
export class LegendDirective {
  opened = true;
  status = new EventEmitter<boolean>();

  @HostListener('click', ['$event']) toggle(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.opened = !this.opened;
    this.status.emit(this.opened);
  }
}
