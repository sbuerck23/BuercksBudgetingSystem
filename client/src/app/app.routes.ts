import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnalyticsComponent } from './analytics/analytics.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'Budgeting Home' },
    { path: 'analytics', component: AnalyticsComponent, title: 'Budget Analytics' }
];
