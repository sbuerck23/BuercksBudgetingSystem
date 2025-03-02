import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output()
  toggleSidenav = new EventEmitter<any>();

  private _bottomSheet = inject(MatBottomSheet);

  public openSidenav(event) {
    this.toggleSidenav.emit(event);
  }

  public openSettings() {
    this._bottomSheet.open(SettingsComponent)
  }
}
