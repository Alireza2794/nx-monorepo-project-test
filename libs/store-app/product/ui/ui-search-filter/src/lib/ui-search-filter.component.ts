import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'lib-ui-search-filter',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './ui-search-filter.component.html',
  styleUrl: './ui-search-filter.component.scss',
})
export class UiSearchFilterComponent {
  searchText = new FormControl('');
  @Output() inputChange: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.searchText.valueChanges
      .pipe(debounceTime(500))
      .subscribe((res: any) => {
        this.inputChange.emit(res);
      });
  }

  reset() {
    this.searchText.setValue('');
  }
}
