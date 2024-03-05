import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Demo } from './app/demo';
import { R } from './app/r';
import { AutoFormDemo } from './app/auto-form-demo';
import { FieldsetDemo } from './app/fieldset-demo';

bootstrapApplication(R, {
  providers: [
    provideRouter([
      {
        path: 'auto',
        component: AutoFormDemo
      },
      {
        path: 'fieldset',
        component: FieldsetDemo
      },
      {
        path: '',
        component: Demo
      }
    ])
  ]
}).catch((err) => console.error(err));
