import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    { path: 'control', loadChildren: () => import('./library/api-tools/control/control.module').then(m => m.ControlModule)},
];
