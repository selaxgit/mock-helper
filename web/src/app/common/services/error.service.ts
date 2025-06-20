import { inject, Injectable } from '@angular/core';
import { JSTDialogService } from '@jst/ui';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private readonly jstDialogService = inject(JSTDialogService);

  showError(message: string, errors: string[]): void {
    if (errors.length > 0) {
      this.jstDialogService.showToastError(errors.join('\n'), message);
    } else {
      this.jstDialogService.showToastError(message);
    }
  }
}
