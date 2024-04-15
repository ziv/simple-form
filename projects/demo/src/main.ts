import { bootstrapApplication } from '@angular/platform-browser';
import { Demo } from './app/demo';

bootstrapApplication(Demo, {
  providers: [
    // provideRouter([
    //   {
    //     path: 'auto',
    //     component: AutoFormDemo
    //   },
    //   {
    //     path: 'fieldset',
    //     component: FieldsetDemo
    //   },
    //   {
    //     path: '',
    //     component: Demo
    //   }
    // ])
  ]
}).catch((err) => console.error(err));
