import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date): string {
    const month = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const mm = month.toString().length === 1 ? '0' + month : month;

    return `${mm}/${yyyy}`;
  }
}

@Component({
  standalone: true,
  selector: 'app-date-range-field',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ],
  templateUrl: './date-range-field.component.html',
  styles: [''],
})
export class DateRangeFieldComponent {
  @Input() name = '';
  @Input() label = 'Date Picker';
  @Input() value = '';
  @Input() validators: ValidatorFn[] = [Validators.required];
  @Input() customErrorMessage = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() dateRangeFieldEvent = new EventEmitter<any>();
  public isRequired = false;
  public currentYear: number = new Date().getFullYear();
  public maxOneYearFromNow: Date = new Date(
    new Date().setFullYear(this.currentYear + 1)
  );
  public earliestQueriedReportDate: Date = new Date('June 01, 1991 00:00:00');

  public dateRangeField = new FormGroup(
    {
      start: new FormControl<Date | string>('', {
        validators: [],
        nonNullable: true,
      }),
      end: new FormControl<Date | string>('', {
        validators: [],
        nonNullable: true,
      }),
    },
    [Validators.required]
  );

  public setMonthAndYear(
    fullDate: Date,
    datePicker: MatDatepicker<unknown>
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unix: any = {
      input: Date.parse(fullDate.toString()),
    };
    const date = {
      start: this.getDate('start'),
      end: this.getDate('end'),
    };

    if (!date.start && !date.end) {
      const update = {
        start: fullDate,
        end: this.getDate('end'),
      };

      this.setDate('start', update.start);
      this.dateRangeFieldEvent.emit({
        name: this.name,
        value: update,
      });

      datePicker.close();

      return;
    }

    if (date.start && !date.end) {
      unix.start = Date.parse(date.start);
      unix.min = Math.min(unix.start, unix.input);
      unix.max = Math.max(unix.start, unix.input);

      const update = {
        start: new Date(unix.min),
        end: new Date(unix.max),
      };

      this.setDate('start', update.start);
      this.setDate('end', update.end);

      this.dateRangeFieldEvent.emit({
        name: this.name,
        value: update,
      });

      datePicker.close();

      return;
    }

    if (!date.start && date.end) {
      unix.end = Date.parse(date.end);
      unix.min = Math.min(unix.end, unix.input);
      unix.max = Math.max(unix.end, unix.input);

      const update = {
        start: new Date(unix.min),
        end: new Date(unix.max),
      };

      this.setDate('start', update.start);
      this.setDate('end', update.end);

      this.dateRangeFieldEvent.emit({
        name: this.name,
        value: update,
      });

      datePicker.close();

      return;
    }

    unix.start = Date.parse(date.start);
    unix.end = Date.parse(date.end);

    if (unix.input <= unix.start && unix.input < unix.end) {
      unix.start = unix.input;
      const update = {
        start: new Date(unix.start),
        end: this.getDate('end'),
      };

      this.setDate('start', update.start);

      this.dateRangeFieldEvent.emit({
        name: this.name,
        value: update,
      });

      datePicker.close();

      return;
    }

    if (unix.input > unix.start && unix.input >= unix.end) {
      unix.end = unix.input;
      const update = {
        start: this.getDate('start'),
        end: new Date(unix.end),
      };

      this.setDate('end', update.end);

      this.dateRangeFieldEvent.emit({
        name: this.name,
        value: update,
      });

      datePicker.close();

      return;
    }

    if (unix.input > unix.start && unix.input < unix.end) {
      unix.end = unix.input;
      const update = {
        start: this.getDate('start'),
        end: new Date(unix.end),
      };

      this.setDate('end', update.end);

      this.dateRangeFieldEvent.emit({
        name: this.name,
        value: update,
      });

      datePicker.close();

      return;
    }
  }

  public onDateChange(event: HTMLInputElement, controlName: string): void {
    const input = event.value;
    let customEvent = {
      name: this.name,
      value: {
        start: this.getDate('start'),
        end: this.getDate('end'),
      },
      errors: this.dateRangeField.get(controlName)?.errors,
    };

    if (!input?.length) {
      this.dateRangeFieldEvent.emit(customEvent);

      return;
    }

    const regex = /^(0[1-9]|1[0-2])\/(\d{4})$/g;
    const isValidDate = input.match(regex);

    if (!isValidDate) {
      this.dateRangeFieldEvent.emit(customEvent);

      return;
    }

    const [mm, yyyy] = input.split('/');
    this.setDate(controlName, new Date(+yyyy, +mm - 1));

    const errors = this.dateRangeField.get('start')?.errors
      ? this.dateRangeField.get('start')?.errors
      : this.dateRangeField.get('end')?.errors
        ? this.dateRangeField.get('end')?.errors
        : null;

    customEvent = {
      name: this.name,
      value: {
        start: this.getDate('start'),
        end: this.getDate('end'),
      },
      errors,
    };

    this.dateRangeFieldEvent.emit(customEvent);
  }

  private getDate(controlName: string) {
    return this.dateRangeField.get(controlName)?.value;
  }

  private setDate(controlName: string, value: Date): void {
    this.dateRangeField.get(controlName)?.setValue(value);
  }
}
