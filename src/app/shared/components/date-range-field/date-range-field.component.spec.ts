/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';

import {
  CustomDateAdapter,
  DateRangeFieldComponent,
} from './date-range-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

describe('DateRangeFieldComponent', () => {
  let component: DateRangeFieldComponent;
  let fixture: ComponentFixture<DateRangeFieldComponent>;
  const dp = { close: () => true } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DateRangeFieldComponent,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideAnimations(),
        {
          provide: DateAdapter,
          useClass: CustomDateAdapter,
          deps: [MAT_DATE_LOCALE],
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DateRangeFieldComponent);
    component = fixture.componentInstance;

    spyOn(component.dateRangeFieldEvent, 'emit').and.callThrough();
    spyOn(component as any, 'getDate').and.callThrough();
    spyOn(component as any, 'setDate').and.callThrough();
    spyOn(dp, 'close').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the start date and emit an event for update when User selected the year and month for the first time through date picker', () => {
    const string = 'Fri Dec 01 2023 00:00:00 GMT-0600 (Central Standard Time)';
    const input = new Date(string);
    const unix = Date.parse(string);

    component.setMonthAndYear(input, dp);

    expect(Date.parse(component['getDate']('start'))).toEqual(unix);
    expect(Date.parse(component['getDate']('end'))).toBeFalsy();
    expect(dp.close).toHaveBeenCalledWith();
    expect(component.dateRangeFieldEvent.emit).toHaveBeenCalled();
  });

  it('should populate the end date and emit an event for update when User selected the year and month through date picker while there is already a value in the start date', () => {
    const string = {
      start: 'Wed Dec 01 2021 00:00:00 GMT-0600 (Central Standard Time)',
      end: '',
      input: 'Thu Dec 01 2022 00:00:00 GMT-0600 (Central Standard Time)',
    };
    const date = {
      start: new Date(string.start),
      end: '',
      input: new Date(string.input),
    };
    const unix = {
      start: Date.parse(string.start),
      end: '',
      input: Date.parse(string.input),
    };
    component.setMonthAndYear(date.start, dp);

    fixture.detectChanges();

    component.setMonthAndYear(date.input, dp);

    expect(Date.parse(component['getDate']('start'))).toEqual(unix.start);
    expect(Date.parse(component['getDate']('end'))).toEqual(unix.input);
    expect(dp.close).toHaveBeenCalledWith();
    expect(component.dateRangeFieldEvent.emit).toHaveBeenCalled();
  });

  it('should update the start date and emit an event for update when User selected the year and month through date picker while there is already a value in both start and end date, and the input is earlier than both dates', () => {
    const string = {
      start: 'Fri Dec 01 2021 00:00:00 GMT-0600 (Central Standard Time)',
      end: 'Fri Dec 01 2022 00:00:00 GMT-0600 (Central Standard Time)',
      input: 'Fri Dec 01 2020 00:00:00 GMT-0600 (Central Standard Time)',
    };
    const date = {
      start: new Date(string.start),
      end: new Date(string.end),
      input: new Date(string.input),
    };
    const unix = {
      start: Date.parse(string.input),
      end: Date.parse(string.end),
      input: Date.parse(string.input),
    };
    component.setMonthAndYear(date.start, dp);
    component.setMonthAndYear(date.end, dp);

    fixture.detectChanges();

    component.setMonthAndYear(date.input, dp);

    expect(Date.parse(component['getDate']('start'))).toEqual(unix.input);
    expect(Date.parse(component['getDate']('end'))).toEqual(unix.end);
    expect(dp.close).toHaveBeenCalledWith();
    expect(component.dateRangeFieldEvent.emit).toHaveBeenCalled();
  });

  it('should update the end date and emit an event for update when User selected the year and month through date picker while there is already a value in both start and end date, and the input is later than both dates', () => {
    const string = {
      start: 'Fri Dec 01 2021 00:00:00 GMT-0600 (Central Standard Time)',
      end: 'Fri Dec 01 2022 00:00:00 GMT-0600 (Central Standard Time)',
      input: 'Fri Dec 01 2023 00:00:00 GMT-0600 (Central Standard Time)',
    };
    const date = {
      start: new Date(string.start),
      end: new Date(string.end),
      input: new Date(string.input),
    };
    const unix = {
      start: Date.parse(string.start),
      end: Date.parse(string.input),
      input: Date.parse(string.input),
    };
    component.setMonthAndYear(date.start, dp);
    component.setMonthAndYear(date.end, dp);

    fixture.detectChanges();

    component.setMonthAndYear(date.input, dp);

    expect(Date.parse(component['getDate']('start'))).toEqual(unix.start);
    expect(Date.parse(component['getDate']('end'))).toEqual(unix.input);
    expect(dp.close).toHaveBeenCalledWith();
    expect(component.dateRangeFieldEvent.emit).toHaveBeenCalled();
  });

  it('should update the end date and emit an event for update when User selected the year and month through date picker while there is already a value in both start and end date, and the input is later than both dates', () => {
    const string = {
      start: 'Fri Dec 01 2021 00:00:00 GMT-0600 (Central Standard Time)',
      end: 'Fri Dec 01 2023 00:00:00 GMT-0600 (Central Standard Time)',
      input: 'Fri Dec 01 2022 00:00:00 GMT-0600 (Central Standard Time)',
    };
    const date = {
      start: new Date(string.start),
      end: new Date(string.end),
      input: new Date(string.input),
    };
    const unix = {
      start: Date.parse(string.start),
      end: Date.parse(string.input),
      input: Date.parse(string.input),
    };
    component.setMonthAndYear(date.start, dp);
    component.setMonthAndYear(date.end, dp);

    fixture.detectChanges();

    component.setMonthAndYear(date.input, dp);

    expect(Date.parse(component['getDate']('start'))).toEqual(unix.start);
    expect(Date.parse(component['getDate']('end'))).toEqual(unix.input);
    expect(dp.close).toHaveBeenCalledWith();
    expect(component.dateRangeFieldEvent.emit).toHaveBeenCalled();
  });

  it('should do nothing when User input invalid date', () => {
    const event = { value: 'aefvaevf' } as HTMLInputElement;
    const controlName = 'statement-range';

    component.onDateChange(event, controlName);

    expect(component['setDate']).not.toHaveBeenCalled();
  });

  it('should set a date when User input a valid format date', () => {
    const event = { value: '11/2023' } as HTMLInputElement;
    const controlName = 'statement-range';
    const date = new Date(2023, 11 - 1);

    component.onDateChange(event, controlName);

    expect(component['setDate']).toHaveBeenCalledWith(controlName, date);
    expect(component.dateRangeFieldEvent.emit).toHaveBeenCalled();
  });
});
