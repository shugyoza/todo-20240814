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
    switch (position) {
      case 'start':
        return this._startDrawer.open();
      default:
        return this._endDrawer.open();
    }
  }

  public close(position: 'start' | 'end'): Promise<MatDrawerToggleResult> {
    switch (position) {
      case 'start':
        return this._startDrawer.close();
      default:
        return this._endDrawer.close();
    }
  }

  public toggle(position: 'start' | 'end'): Promise<MatDrawerToggleResult> {
    if (position === 'start') {
      return this._startDrawer.toggle();
    }

    const result = this._endDrawer?.toggle();
    return result;
  }

  public drawerIsOpened(position: 'start' | 'end'): boolean {
    switch (position) {
      case 'start':
        return this._startDrawer.opened;
      default:
        return this._endDrawer.opened;
    }
  }
}
