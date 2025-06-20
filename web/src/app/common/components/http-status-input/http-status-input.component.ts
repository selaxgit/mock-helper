import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';

import { IStatusesGroup, IStatusValue, STATUSES_GROUPS } from './constants';

export const filterGroupValues = (values: IStatusValue[], value: string | number): IStatusValue[] => {
  const filterValue = String(value).toLowerCase();
  return values.filter((item: IStatusValue) => item.title.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'http-status-input',
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './http-status-input.component.html',
  styleUrl: './http-status-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpStatusInputComponent implements OnInit, OnChanges {
  @Input() label = 'Http statuses';

  @Input() value: string | number | null = null;

  @Output() valueChange = new EventEmitter<string | number | null>();

  statusesGroups = STATUSES_GROUPS;

  statusesGroupsOptions!: Observable<IStatusesGroup[]>;

  formControl = new FormControl<string | number | null>(null);

  ngOnInit(): void {
    this.statusesGroupsOptions = this.formControl.valueChanges.pipe(
      startWith(this.value),
      map((value: string | number | null) => {
        this.valueChange.emit(value);
        return this.filterGroup(value || '');
      }),
    );
    if (this.value) {
      this.formControl.setValue(this.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.prototype.hasOwnProperty.call(changes, 'value')) {
      this.formControl.setValue(this.value);
    }
  }

  private filterGroup(value: string | number): IStatusesGroup[] {
    if (value) {
      return this.statusesGroups
        .map((group: IStatusesGroup) => ({ group: group.group, values: filterGroupValues(group.values, value) }))
        .filter((group: IStatusesGroup) => group.values.length > 0);
    }

    return this.statusesGroups;
  }
}
