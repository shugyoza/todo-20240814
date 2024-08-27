import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IosListsComponent } from './ios-lists.component';
import { lists } from 'src/assets/constants.mock';

describe('IosListsComponent', () => {
  let component: IosListsComponent;
  let fixture: ComponentFixture<IosListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IosListsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(IosListsComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should expand the card (list of buttons) when .toggleExpand() gets called', () => {
    const card = lists[1];

    component.toggleExpand(card);
  });
});
