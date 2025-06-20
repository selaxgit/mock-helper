import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JSTDialogService } from '@jst/ui';

import * as pkg from '../../../../package.json';
import { DragSectionDirective, DropMethodToSectionDirective, DropSectionDirective } from '../directives';
import { ISection } from '../interfaces';
import { StoreService } from '../servises';
import { SectionEditComponent } from './section-edit/section-edit.component';
import { SectionItemComponent } from './section-item/section-item.component';

@Component({
  selector: 'sections',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    SectionItemComponent,
    DropMethodToSectionDirective,
    DropSectionDirective,
    DragSectionDirective,
  ],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent implements OnInit {
  version = '???';

  readonly storeService = inject(StoreService);

  private readonly jstDialogService = inject(JSTDialogService);

  constructor() {
    this.version = pkg.version;
  }

  ngOnInit(): void {
    this.storeService.fetchSections();
    this.storeService.fetchMethods(null);
  }

  onRemoveSection(id: number): void {
    this.storeService.removeSection(id);
  }

  onEditSection(section: ISection): void {
    this.editSection(section);
  }

  onSelectSection(section: ISection | null): void {
    this.storeService.selectSection(section);
  }

  onAddSection(): void {
    this.editSection();
  }

  private editSection(data: ISection | null = null): void {
    const title = data?.id ? 'Редактирование раздела' : 'Добавление раздела';
    this.jstDialogService
      .showModal<ISection | null>(title, SectionEditComponent, data ?? {})
      .subscribe((value: ISection | null) => {
        if (value) {
          if (data?.id) {
            this.storeService.updateSection({ ...value, id: data.id });
          } else {
            this.storeService.addSection(value);
          }
        }
      });
  }
}
