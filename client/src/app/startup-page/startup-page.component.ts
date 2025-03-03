import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-startup-page',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './startup-page.component.html',
  styleUrl: './startup-page.component.scss'
})
export class StartupPageComponent {

}
