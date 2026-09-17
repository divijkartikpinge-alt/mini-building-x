import { Routes } from '@angular/router';
import { Details } from './details';
import { Readings } from './readings';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'readings' },
	{ path: 'readings', component: Readings },
	{ path: 'details', component: Details },
	{ path: '**', redirectTo: 'readings' },
];
