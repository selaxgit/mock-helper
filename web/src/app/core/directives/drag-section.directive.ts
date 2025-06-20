import { Directive, DOCUMENT, ElementRef, HostBinding, HostListener, inject, Input } from '@angular/core';

import { BODY_DRAGGING_SECTION_CLASS } from '../../common/constants';
import { DragDropDataService } from '../../common/services';

const STOP_DROP_CLASS = 'stop-drop';

@Directive({
  selector: '[dragSection]',
})
export class DragSectionDirective {
  @Input('dragSection') dragSectionIdx!: number;

  private readonly elementRef = inject(ElementRef);

  private readonly document = inject(DOCUMENT);

  private readonly dragDropDataService = inject(DragDropDataService);

  @HostBinding('draggable') get getDraggable(): boolean {
    return true;
  }

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent): void {
    this.document.body.classList.add(BODY_DRAGGING_SECTION_CLASS);
    this.elementRef?.nativeElement?.classList?.add(STOP_DROP_CLASS);
    this.dragDropDataService.setDragSectionIdx(this.dragSectionIdx);
    const dt = event.dataTransfer;
    if (dt) {
      if (this.elementRef?.nativeElement) {
        dt.setDragImage(this.elementRef.nativeElement, 0, 0);
      }
    }
  }

  @HostListener('dragend') onDragEnd(): void {
    this.document.body.classList.remove(BODY_DRAGGING_SECTION_CLASS);
    this.elementRef?.nativeElement?.classList?.remove(STOP_DROP_CLASS);
    this.dragDropDataService.clearAll();
  }
}
