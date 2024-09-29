import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';

import { TodoApiService } from '@core/http/todo-api/todo-api.service';
import { Observable, of } from 'rxjs';
import { SelectOption } from 'src/app/interfaces/select-option.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss',
})
export class SelectDropdownComponent implements OnInit {
  private _api = environment.url.api;

  private _todoApiService = inject(TodoApiService);

  public options$: Observable<SelectOption<number, string>[] | null> =
    this._todoApiService.read<SelectOption<number, string>[]>(
      this._api.root + this._api.path.us_state.postal_abbr
    );

  ngOnInit(): void {}
}
