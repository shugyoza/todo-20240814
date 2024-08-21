import { Injectable } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavDrawerService {
  private _startDrawer!: MatDrawer;

  private _endDrawer!: MatDrawer;

  public set startDrawer(drawer: MatDrawer) {
    this._startDrawer = drawer;
  }

  public set endDrawer(drawer: MatDrawer) {
    this._endDrawer = drawer;
  }

  public open(position: 'start' | 'end'): Promise<MatDrawerToggleResult> {
    if (position === 'start') {
      return this._startDrawer.open();
    }

    return this._endDrawer.open();
  }

  public close(position: 'start' | 'end'): Promise<MatDrawerToggleResult> {
    if (position === 'start') {
      return this._startDrawer.close();
    }

    return this._endDrawer.close();
  }

  public toggle(position: 'start' | 'end'): Promise<MatDrawerToggleResult> {
    if (position === 'start') {
      return this._startDrawer.toggle();
    }

    return this._endDrawer.toggle();
  }

  public drawerIsOpened(position: 'start' | 'end'): boolean {
    if (position === 'start') {
      return this._startDrawer.opened;
    }

    return this._endDrawer.opened;
  }
}
