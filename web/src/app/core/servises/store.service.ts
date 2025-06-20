import { DestroyRef, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable, of, switchMap } from 'rxjs';

import { IMethod, IOrder, ISection } from '../interfaces';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class StoreService {
  readonly isLoadingMethods: WritableSignal<boolean> = signal(false);

  readonly methodsList: WritableSignal<IMethod[]> = signal([]);

  readonly isLoadingSections: WritableSignal<boolean> = signal(false);

  readonly sectionsList: WritableSignal<ISection[]> = signal([]);

  readonly currentSection: WritableSignal<ISection | null> = signal(null);

  private readonly apiService = inject(ApiService);

  private readonly destroyRef = inject(DestroyRef);

  fetchMethods(sectionId: number | null): void {
    this.isLoadingMethods.set(true);
    this.apiService
      .fetchMethods(sectionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (methods: IMethod[]) => {
          this.methodsList.set(methods);
        },
        error: () => this.isLoadingMethods.set(false),
        complete: () => this.isLoadingMethods.set(false),
      });
  }

  removeMethod(id: number): void {
    this.isLoadingMethods.set(true);
    this.apiService
      .removeMethod(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.methodsList.update((value: IMethod[]) => {
            const idx = value.findIndex((i: IMethod) => i.id === id);
            if (idx >= 0) {
              value.splice(idx, 1);
            }
            return [...value];
          });
        },
        error: () => this.isLoadingMethods.set(false),
        complete: () => this.isLoadingMethods.set(false),
      });
  }

  updateMethod(data: IMethod): Observable<void> {
    data.sectionId = this.currentSection()?.id ?? null;
    return this.apiService.updateMethod(data).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((method: IMethod) => {
        this.methodsList.update((value: IMethod[]) => {
          const item = value.find((i: IMethod) => i.id === data.id);
          if (item) {
            Object.assign(item, method);
          }
          return [...value];
        });
        return of(undefined);
      }),
    );
  }

  moveMethod(data: IMethod, sectionId: number): void {
    data.sectionId = sectionId;
    this.isLoadingMethods.set(true);
    this.apiService
      .updateMethod(data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoadingMethods.set(false)),
      )
      .subscribe(() => {
        this.methodsList.update((value: IMethod[]) => {
          const idx = value.findIndex((i: IMethod) => i.id === data.id);
          if (idx >= 0) {
            value.splice(idx, 1);
          }
          return [...value];
        });
      });
  }

  orderMethods(fromIdx: number, toIdx: number | null): void {
    this.isLoadingMethods.set(true);
    this.methodsList.update((value: IMethod[]) => {
      const item = value.splice(fromIdx, 1);
      if (toIdx !== null) {
        value.splice(toIdx, 0, item[0]);
      }
      return [...value];
    });
    const params: IOrder = {};
    let order = 0;
    this.methodsList().forEach((item: IMethod) => {
      params[item.id] = order;
      order++;
    });
    this.apiService
      .orderMethods(params)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoadingMethods.set(false)),
      )
      .subscribe();
  }

  addMethod(data: Partial<IMethod>): Observable<void> {
    data.sectionId = this.currentSection()?.id ?? null;
    return this.apiService.addMethod(data).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((method: IMethod) => {
        this.methodsList.update((value: IMethod[]) => {
          value.push(method);
          return [...value];
        });
        return of(undefined);
      }),
    );
  }

  orderSections(fromIdx: number, toIdx: number | null): void {
    this.isLoadingSections.set(true);
    this.sectionsList.update((value: ISection[]) => {
      const item = value.splice(fromIdx, 1);
      if (toIdx !== null) {
        value.splice(toIdx, 0, item[0]);
      }
      return [...value];
    });
    const params: IOrder = {};
    let order = 0;
    this.sectionsList().forEach((item: ISection) => {
      params[item.id] = order;
      order++;
    });
    this.apiService
      .orderЫSections(params)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoadingSections.set(false)),
      )
      .subscribe();
  }

  selectSection(section: ISection | null): void {
    if ((section === null && this.currentSection() === null) || this.currentSection()?.id === section?.id) {
      return;
    }
    this.currentSection.set(section);
    this.fetchMethods(section?.id ?? null);
  }

  removeSection(id: number): void {
    this.isLoadingSections.set(true);
    this.apiService
      .removeSection(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.sectionsList.update((value: ISection[]) => {
            const idx = value.findIndex((i: ISection) => i.id === id);
            if (idx >= 0) {
              value.splice(idx, 1);
            }
            return [...value];
          });
          if (this.currentSection()) {
            if (!this.sectionsList().some((i: ISection) => i.id === this.currentSection()?.id)) {
              this.selectSection(null);
            }
          }
        },
        error: () => this.isLoadingSections.set(false),
        complete: () => this.isLoadingSections.set(false),
      });
  }

  updateSection(data: ISection): void {
    this.isLoadingSections.set(true);
    this.apiService
      .updateSection(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (section: ISection) => {
          this.sectionsList.update((value: ISection[]) => {
            const item = value.find((i: ISection) => i.id === data.id);
            if (item) {
              Object.assign(item, section);
            }
            return [...value];
          });
        },
        error: () => this.isLoadingSections.set(false),
        complete: () => this.isLoadingSections.set(false),
      });
  }

  addSection(data: Partial<ISection>): void {
    this.isLoadingSections.set(true);
    this.apiService
      .addSection(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (section: ISection) => {
          this.sectionsList.update((value: ISection[]) => {
            value.push(section);
            return [...value];
          });
          this.selectSection(section);
        },
        error: () => this.isLoadingSections.set(false),
        complete: () => this.isLoadingSections.set(false),
      });
  }

  fetchSections(): void {
    this.isLoadingSections.set(true);
    this.apiService
      .fetchSection()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (sections: ISection[]) => {
          this.sectionsList.set(sections);
        },
        error: () => this.isLoadingSections.set(false),
        complete: () => this.isLoadingSections.set(false),
      });
  }
}
