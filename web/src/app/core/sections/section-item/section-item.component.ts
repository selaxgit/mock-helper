import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JSTDialogService } from '@jst/ui';

import { MOCK_PREFIX } from '../../../common/constants';
import { DropSectionDirective } from '../../directives';

@Component({
  selector: 'section-item',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, DropSectionDirective],
  templateUrl: './section-item.component.html',
  styleUrl: './section-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionItemComponent {
  @Input() idx!: number;

  @Input() sectionName = '';

  @Input() sectionUrl = '';

  @Output() clickEvent = new EventEmitter<void>();

  @Output() editEvent = new EventEmitter<void>();

  @Output() removeEvent = new EventEmitter<void>();

  readonly mockPrefix = MOCK_PREFIX;

  private readonly jstDialogService = inject(JSTDialogService);

  @HostListener('click') onClick(): void {
    this.clickEvent.emit();
  }

  onEdit(e: MouseEvent): void {
    e.stopPropagation();
    this.editEvent.emit();
  }

  onRemove(e: MouseEvent): void {
    e.stopPropagation();
    this.jstDialogService
      .showConfirm(`Вы действительно хотите удалить этот раздел?<br />Все вложенные методы тоже будут удалены.`)
      .subscribe((isOk: boolean) => {
        if (isOk) {
          this.removeEvent.emit();
        }
      });
  }
}
