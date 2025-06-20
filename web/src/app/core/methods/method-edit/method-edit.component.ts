import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IJSTSelectItem, JSTFormControl, JSTInputModule, JSTSelectModule } from '@jst/ui';
import JSONEditor from 'jsoneditor';
import { finalize, Observable, of, Subscriber, switchMap } from 'rxjs';

import { HttpStatusInputComponent, SlidePanelExtendClass } from '../../../common/components';
import { MOCK_PREFIX } from '../../../common/constants';
import { ValidatorHelper } from '../../../common/helpers';
import { HttpMethodsEnum, IMethod } from '../../interfaces';
import { StoreService } from '../../servises';

const DEF_STATUS = 200;

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    JSTInputModule,
    JSTSelectModule,
    HttpStatusInputComponent,
  ],
  templateUrl: './method-edit.component.html',
  styleUrl: './method-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MethodEditComponent extends SlidePanelExtendClass implements OnInit, AfterViewInit, OnDestroy {
  @Input() sectionName = '';

  @Input() id: number | null = null;

  @Input() request: HttpMethodsEnum = HttpMethodsEnum.Get;

  @Input() status = DEF_STATUS;

  @Input() method = '';

  @Input() name = '';

  @Input() response = {};

  @ViewChild('jsonElement') jsonElementRef!: ElementRef<HTMLInputElement>;

  readonly mockPrefix = MOCK_PREFIX;

  readonly isProcessing: WritableSignal<boolean> = signal(false);

  title = 'Title';

  httpMethodsList: IJSTSelectItem[] = [
    {
      value: HttpMethodsEnum.Get,
      title: 'GET',
    },
    {
      value: HttpMethodsEnum.Post,
      title: 'POST',
    },
  ];

  controlRequest = new JSTFormControl(null);

  constrolStatus: string | number | null = null;

  controlMethod = new JSTFormControl(null, ValidatorHelper.notEmptyValue);

  controlName = new JSTFormControl(null, ValidatorHelper.notEmptyValue);

  private jsonEditor: JSONEditor | null = null;

  private readonly destroyRef = inject(DestroyRef);

  private readonly storeService = inject(StoreService);

  ngOnInit(): void {
    this.title = this.id ? 'Редактирование метода' : 'Новый метод';
    this.controlRequest.setValue(this.request);
    this.constrolStatus = this.status;
    this.controlMethod.setValue(this.method);
    this.controlName.setValue(this.name);
  }

  ngAfterViewInit(): void {
    if (this.jsonElementRef?.nativeElement) {
      this.jsonEditor = new JSONEditor(
        this.jsonElementRef.nativeElement,
        {
          mode: 'text',
          mainMenuBar: true,
          history: true,
          enableSort: false,
          enableTransform: false,
          language: 'ru',
        },
        this.response ?? {},
      );
    }
  }

  ngOnDestroy(): void {
    if (this.jsonEditor) {
      this.jsonEditor.destroy();
    }
  }

  onApply(): void {
    this.validate()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((fields: Partial<IMethod> | null) => {
        if (fields) {
          this.saveMethod(fields);
        }
      });
  }

  onClose(): void {
    this.closePanel(undefined);
  }

  saveMethod(fields: Partial<IMethod>): void {
    this.isProcessing.set(true);
    of(undefined)
      .pipe(
        switchMap(() =>
          this.id
            ? this.storeService.updateMethod({ id: this.id, ...fields } as IMethod)
            : this.storeService.addMethod(fields),
        ),
        finalize(() => this.isProcessing.set(false)),
      )
      .subscribe({ next: () => this.onClose(), error: () => {} });
  }

  private validate(): Observable<Partial<IMethod> | null> {
    return new Observable<Partial<IMethod> | null>((observer: Subscriber<Partial<IMethod> | null>) => {
      if (this.jsonEditor) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.jsonEditor.validate().then((errors: any) => {
          if (errors.length === 0) {
            let status = parseInt(String(this.constrolStatus), 10);
            if (isNaN(status)) {
              status = DEF_STATUS;
            }
            this.constrolStatus = status;
            if (this.controlMethod.valid && this.controlName.valid) {
              observer.next({
                request: this.controlRequest.value,
                status,
                method: this.controlMethod.value,
                name: this.controlName.value,
                response: this.jsonEditor?.get() ?? {},
              });
            } else {
              this.controlMethod.markAsTouched();
              this.controlName.markAsTouched();
              observer.next(null);
            }
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      } else {
        observer.next(null);
        observer.complete();
      }
    });
  }
}
