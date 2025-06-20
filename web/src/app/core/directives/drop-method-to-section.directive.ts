import { Directive, DOCUMENT, ElementRef, HostListener, inject, Input } from '@angular/core';

import { BODY_DRAGGING_METHOD_CLASS } from '../../common/constants';
import { DragDropDataService } from '../../common/services';
import { StoreService } from '../servises';

const IS_CAN_DROP_CLASS = 'can-drop-method';

@Directive({
  selector: '[dropMethodToSection]',
})
export class DropMethodToSectionDirective {
  @Input('dropMethodToSection') sectionId!: number;

  private readonly elementRef = inject(ElementRef);

  private readonly document = inject(DOCUMENT);

  private readonly dragDropDataService = inject(DragDropDataService);

  private readonly storeService = inject(StoreService);

  @HostListener('drop', ['$event']) onDrop(event: DragEvent): void {
    this.document.body.classList.remove(BODY_DRAGGING_METHOD_CLASS);
    const method = this.dragDropDataService.getDragMethod();
    if (method !== null && method.sectionId !== this.sectionId) {
      this.elementRef.nativeElement.classList.remove(IS_CAN_DROP_CLASS);
      event.preventDefault();
      this.storeService.moveMethod(method, this.sectionId);
    }
  }

  @HostListener('dragover', ['$event']) onDragEnd(event: DragEvent): void {
    if (this.isCanDrop()) {
      event.preventDefault();
    }
  }

  @HostListener('dragenter') onDragEnter(): void {
    if (this.isCanDrop()) {
      this.elementRef.nativeElement.classList.add(IS_CAN_DROP_CLASS);
    }
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent): void {
    if (!this.elementRef.nativeElement.contains(event.relatedTarget)) {
      this.elementRef.nativeElement.classList.remove(IS_CAN_DROP_CLASS);
    }
  }

  private isCanDrop(): boolean {
    const method = this.dragDropDataService.getDragMethod();
    return method !== null && method.sectionId !== this.sectionId;
  }
}
