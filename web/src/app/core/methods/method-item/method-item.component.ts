import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JSTDialogService } from '@jst/ui';

import { DropMethodToMethodDirective } from '../../directives';
import { HttpMethodsEnum } from '../../interfaces';

@Component({
  selector: 'method-item',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, DropMethodToMethodDirective],
  templateUrl: './method-item.component.html',
  styleUrl: './method-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MethodItemComponent {
  @Input() idx!: number;

  @Input() request!: HttpMethodsEnum;

  @Input() status!: number;

  @Input() method!: string;

  @Input() name!: string;

  @Output() editEvent = new EventEmitter<void>();

  @Output() sendEvent = new EventEmitter<void>();

  @Output() removeEvent = new EventEmitter<void>();

  private readonly jstDialogService = inject(JSTDialogService);

  onSend(): void {
    this.sendEvent.emit();
  }

  onEdit(): void {
    this.editEvent.emit();
  }

  onRemove(): void {
    this.jstDialogService.showConfirm(`Вы действительно хотите удалить этот метод?`).subscribe((isOk: boolean) => {
      if (isOk) {
        this.removeEvent.emit();
      }
    });
  }
}
