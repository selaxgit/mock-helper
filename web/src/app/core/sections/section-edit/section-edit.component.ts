import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { JSTFormControl, JSTInputModule } from '@jst/ui';

import { MOCK_PREFIX } from '../../../common/constants';
import { ValidatorHelper } from '../../../common/helpers';

@Component({
  imports: [MatButtonModule, JSTInputModule],
  templateUrl: './section-edit.component.html',
  styleUrl: './section-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionEditComponent {
  @Input() set name(value: string | null) {
    this.controlName.setValue(value);
  }

  @Input() set url(value: string | null) {
    this.controlUrl.setValue(value);
  }

  dialogRef!: MatDialogRef<SectionEditComponent>;

  readonly mockPrefix = MOCK_PREFIX;

  readonly controlName = new JSTFormControl(null, ValidatorHelper.notEmptyValue);

  readonly controlUrl = new JSTFormControl(null, ValidatorHelper.notEmptyValue);

  onApply(): void {
    if (this.controlName.valid && this.controlUrl.valid) {
      this.dialogRef?.close({
        name: this.controlName.value,
        url: this.controlUrl.value,
      });
    }
  }

  onClose(): void {
    this.dialogRef?.close();
  }
}
