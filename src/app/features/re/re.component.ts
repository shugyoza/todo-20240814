import { AsyncPipe, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { context } from '@constants/layout.constants';
import { DocumentService } from '@core/services/document/document.service';
import { LayoutPipe } from '@shared/pipes/layout/layout.pipe';

interface Step {
  label: string;
  control: FormControl | FormGroup;
}

export class CustomDateAdapter extends NativeDateAdapter {
  private _documentService = inject(DocumentService);

  override format(date: Date): string {
    const options = {
      month: 'long', // 'short',
      day: '2-digit',
      year: 'numeric',
      weekday: 'long', // 'short',
    } as Intl.DateTimeFormatOptions;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const time = date.toLocaleString(this._documentService.language, options);

    return time;
  }
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-re',
  templateUrl: 're.component.html',
  styleUrl: 're.component.scss',
  providers: [
    // provideNativeDateAdapter(),
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ],
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    NgTemplateOutlet,
    AsyncPipe,
    JsonPipe,
    LayoutPipe,
  ],
})
export class ReComponent {
  private readonly _currentYear = new Date().getFullYear();

  public _documentService = inject(DocumentService);

  public context = context;

  public readonly minDate = new Date(this._currentYear - 20, 0, 1);

  public readonly maxDate = new Date(this._currentYear + 1, 11, 31);

  public isLinear = true;

  public desiredUnit = '';

  public steps: Step[] = [
    {
      label: 'Floor Plans',
      control: new FormGroup({
        moveInDate: new FormControl('', Validators.required),
        bedrooms: new FormControl(),
      }),
    },
    {
      label: 'Apartment',
      control: new FormControl(''),
    },
    {
      label: 'Lease Terms',
      control: new FormControl(''),
    },
    {
      label: 'Quote',
      control: new FormControl(''),
    },
  ];
}
