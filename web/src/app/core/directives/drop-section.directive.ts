import { Directive, DOCUMENT, ElementRef, HostListener, inject, Input } from '@angular/core';

import { BODY_DRAGGING_SECTION_CLASS } from '../../common/constants';
import { DragDropDataService } from '../../common/services';
import { StoreService } from '../servises';

const IS_CAN_DROP_CLASS = 'is-has-drop';

@Directive({
  selector: '[dropSection]',
})
export class DropSectionDirective {
  @Input('dropSection') sectionIdx!: number;

  private readonly elementRef = inject(ElementRef);

  private readonly document = inject(DOCUMENT);

  private readonly dragDropDataService = inject(DragDropDataService);

  private readonly storeService = inject(StoreService);

  @HostListener('drop', ['$event']) onDrop(event: DragEvent): void {
    this.document.body.classList.remove(BODY_DRAGGING_SECTION_CLASS);
    this.elementRef.nativeElement.classList.remove(IS_CAN_DROP_CLASS);
    const dragSectionIdx = this.dragDropDataService.getDragSectionIdx();
    if (dragSectionIdx !== null && dragSectionIdx - 1 !== this.sectionIdx) {
      event.preventDefault();
      let toIdx = this.sectionIdx;
      if (toIdx < dragSectionIdx) {
        toIdx++;
      }
      this.storeService.orderSections(dragSectionIdx, toIdx);
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
    const dragSectionIdx = this.dragDropDataService.getDragSectionIdx();
    return dragSectionIdx !== null && dragSectionIdx - 1 !== this.sectionIdx;
  }
}
