/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SlidePanelExtendClass } from '../../../common/components';

@Component({
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule, JsonPipe],
  templateUrl: './method-send.component.html',
  styleUrl: './method-send.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MethodSendComponent extends SlidePanelExtendClass {
  @Input() url!: string;

  @Input() request!: string;

  @Input() status!: number;

  @Input() response!: any;

  readonly isProcessing: WritableSignal<boolean> = signal(false);

  readonly serverStatus: WritableSignal<number | string> = signal('unknown');

  readonly serverResponse: WritableSignal<any> = signal('unknown');

  onSend(): void {
    this.isProcessing.set(true);
    this.serverStatus.set('pending...');
    this.serverResponse.set('pending...');
    fetch(this.url, { method: this.request })
      .then((response: any) => {
        this.serverStatus.set(response.status);
        return response.json();
      })
      .then((data: any) => this.serverResponse.set(data))
      .finally(() => this.isProcessing.set(false));
  }

  onClose(): void {
    this.closePanel(undefined);
  }
}
