import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-text-field',
  templateUrl: 'text-field.component.html',
  styleUrl: 'text-field.component.scss',
  imports: [FormsModule],
})
export class TextFieldComponent {
  @Input() value = '';

  public id = input<string>('');

  public textInput = output<{ id: string; value: string }>();

  public onCancel(): void {
    this.value = '';
  }
}
