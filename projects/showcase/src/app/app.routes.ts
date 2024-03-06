import { Routes } from '@angular/router';
import { Debug } from './debug';
import { Auto } from './auto';

export const routes: Routes = [
  {
    path: 'debug',
    component: Debug
  },
  {
    path: 'auto',
    component: Auto
  }
];
