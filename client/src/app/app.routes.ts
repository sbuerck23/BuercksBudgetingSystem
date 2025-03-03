import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ErrorComponent } from './error/error.component';
import { StartupPageComponent } from './startup-page/startup-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    { path: '', component: StartupPageComponent, title: 'BBS' },
    { path: 'login', component: LoginComponent, title: 'BBS Login' },
    { path: 'register', component: RegisterComponent, title: 'BBS Register' },
    { path: 'home', component: HomeComponent, title: 'BBS Home' },
    { path: 'analytics', component: AnalyticsComponent, title: 'BBS Analytics' },
    { path: '**', component: ErrorComponent, title: 'Error' }
];
