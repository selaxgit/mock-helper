import { Injectable } from '@angular/core';

import { IMethod } from '../../core/interfaces';

@Injectable({ providedIn: 'root' })
export class DragDropDataService {
  private dragMethod: IMethod | null = null;

  private dragMethodIdx: number | null = null;

  private dragSectionIdx: number | null = null;

  getDragMethod(): IMethod | null {
    return this.dragMethod;
  }

  getDragMethodIdx(): number | null {
    return this.dragMethodIdx;
  }

  getDragSectionIdx(): number | null {
    return this.dragSectionIdx;
  }

  setDragMethod(method: IMethod, methodIdx: number): void {
    this.dragMethod = method;
    this.dragMethodIdx = methodIdx;
  }

  setDragSectionIdx(sectionIdx: number): void {
    this.dragSectionIdx = sectionIdx;
  }

  clearAll(): void {
    this.dragMethod = null;
    this.dragMethodIdx = null;
    this.dragSectionIdx = null;
  }
}
