import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { JSTFormControl, JSTInputModule } from '@jst/ui';

import { MOCK_PREFIX } from '../../../common/constants';
import { ValidatorHelper } from '../../../common/helpers';
import { ISection } from '../../interfaces';

@Component({
  imports: [MatButtonModule, JSTInputModule],
  templateUrl: './section-edit.component.html',
  styleUrl: './section-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionEditComponent {
  dialogRef!: MatDialogRef<SectionEditComponent>;

  readonly mockPrefix = MOCK_PREFIX;

  readonly controlName = new JSTFormControl(null, ValidatorHelper.notEmptyValue);

  readonly controlUrl = new JSTFormControl(null, ValidatorHelper.notEmptyValue);

  setData(data: Partial<ISection>): void {
    this.controlName.setValue(data?.name || null);
    this.controlUrl.setValue(data?.url || null);
  }

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
