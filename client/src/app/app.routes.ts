import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'BBS Home' },
    { path: 'analytics', component: AnalyticsComponent, title: 'BBS Analytics' },
    { path: '**', component: ErrorComponent, title: 'Error' }
];
