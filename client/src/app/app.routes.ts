import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { MonthlyBreakdownComponent } from './monthly-breakdown/monthly-breakdown';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'monthly-breakdown', component: MonthlyBreakdownComponent },
];
