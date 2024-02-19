import { bootstrapApplication } from '@angular/platform-browser';
import { Demo } from './app/demo';

bootstrapApplication(Demo)
  .catch((err) => console.error(err));
