import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SlidePanelService } from '../../common/components';
import { MOCK_PREFIX } from '../../common/constants';
import { DragMethodDirective, DropMethodToMethodDirective } from '../directives';
import { HttpMethodsEnum, IMethod } from '../interfaces';
import { StoreService } from '../servises';
import { MethodEditComponent } from './method-edit/method-edit.component';
import { MethodItemComponent } from './method-item/method-item.component';
import { MethodSendComponent } from './method-send/method-send.component';

@Component({
  selector: 'methods',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MethodItemComponent,
    DragMethodDirective,
    DropMethodToMethodDirective,
  ],
  templateUrl: './methods.component.html',
  styleUrl: './methods.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MethodsComponent {
  readonly mockPrefix = MOCK_PREFIX;

  readonly storeService = inject(StoreService);

  private readonly slidePanelService = inject(SlidePanelService);

  onSendMethod(method: IMethod): void {
    const url = `${this.mockPrefix}${this.storeService.currentSection()?.url ?? ''}/${method.method}`;
    this.slidePanelService
      .showPanel$<MethodSendComponent, void>(
        MethodSendComponent,
        {
          url,
          status: method.status,
          response: method.response,
          request: method.request,
        },
        { disabledClose: true },
      )
      .subscribe();
  }

  onRemoveMethod(id: number): void {
    this.storeService.removeMethod(id);
  }

  onEditMethod(method: IMethod): void {
    this.editMethod(JSON.parse(JSON.stringify(method)));
  }

  onAddMethod(): void {
    this.editMethod();
  }

  editMethod(data: Partial<IMethod> = {}): void {
    this.slidePanelService
      .showPanel$<MethodEditComponent, void>(
        MethodEditComponent,
        {
          sectionName: this.storeService.currentSection()?.url,
          id: data?.id ?? null,
          request: data?.request ?? HttpMethodsEnum.Get,
          status: data?.status ?? 200,
          method: data?.method ?? '',
          name: data?.name ?? '',
          response: data?.response ?? {},
        },
        { disabledClose: true },
      )
      .subscribe();
  }
}
