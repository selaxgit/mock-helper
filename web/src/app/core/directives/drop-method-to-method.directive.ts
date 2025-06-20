import { Directive, DOCUMENT, ElementRef, HostListener, inject, Input } from '@angular/core';

import { BODY_DRAGGING_METHOD_CLASS } from '../../common/constants';
import { DragDropDataService } from '../../common/services';
import { StoreService } from '../servises';

const IS_CAN_DROP_CLASS = 'is-has-drop';

@Directive({
  selector: '[dropMethodToMethod]',
})
export class DropMethodToMethodDirective {
  @Input('dropMethodToMethod') methodIdx!: number;

  private readonly elementRef = inject(ElementRef);

  private readonly document = inject(DOCUMENT);

  private readonly dragDropDataService = inject(DragDropDataService);

  private readonly storeService = inject(StoreService);

  @HostListener('drop', ['$event']) onDrop(event: DragEvent): void {
    this.document.body.classList.remove(BODY_DRAGGING_METHOD_CLASS);
    this.elementRef.nativeElement.classList.remove(IS_CAN_DROP_CLASS);
    const dragMethodIdx = this.dragDropDataService.getDragMethodIdx();
    if (dragMethodIdx !== null && dragMethodIdx - 1 !== this.methodIdx) {
      event.preventDefault();
      let toIdx = this.methodIdx;
      if (toIdx < dragMethodIdx) {
        toIdx++;
      }
      this.storeService.orderMethods(dragMethodIdx, toIdx);
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
    const dragMethodIdx = this.dragDropDataService.getDragMethodIdx();
    return dragMethodIdx !== null && dragMethodIdx - 1 !== this.methodIdx;
  }
}
