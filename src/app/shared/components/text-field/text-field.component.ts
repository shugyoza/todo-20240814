import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TouchDirective } from '@shared/directives/touch/touch.directive';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-text-field',
  templateUrl: 'text-field.component.html',
  styleUrl: 'text-field.component.scss',
  imports: [FormsModule, NgStyle, TouchDirective],
})
export class TextFieldComponent {
  @Input() value = '';

  public id = input<string>('');

  public textInput = output<{ id: string; value: string }>();

  public list = [
    {
      id: 1,
      name: 'Ifan Deffinika',
    },
    {
      id: 2,
      name: 'Rizkiana Api Priyanti',
    },
  ];

  public showEdit = false;

  public onCancel(): void {
    this.value = '';
  }

  public onTouch(event: any, key: string, index: number) {
    return { event, key, index };
  }

  public onClick(event: MouseEvent) {
    return event;
  }
}
