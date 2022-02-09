import {
  ColDef,
  ColumnApi,
  GetContextMenuItemsParams,
  GridApi,
  GridReadyEvent,
  MenuItemDef,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { Component, OnDestroy, OnInit, Self } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import 'ag-grid-enterprise';

import * as Actions from './store/app-store.actions';
import { COL_FIELDS, COL_HEADER_NAMES, DEFAULT_COL_DEF } from './shared/column-defs.constants';
import { thumbnailRenderer, titleRenderer } from './utils/renderers.utils';
import { VideoGridRowItem } from './shared/video-grid-row-item.interface';
import { VideosService } from './services/videos.service';
import { YOUTUBE_VIDEO_BASE_URL } from './shared/base-urls.constants';
import { mapItemsToVideos } from './utils/videos.utils';
import { selectVideos } from './store/app-store.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [VideosService],
})
export class AppComponent implements OnInit, OnDestroy {
  public readonly defaultRowHeight = 90;
  public readonly rowSelection = 'multiple';
  public readonly suppressRowClickSelection = true;

  public columnDefs: ColDef[];
  public defaultColDef: ColDef;
  public isSelectionEnable: boolean;
  public recordsCount: number;

  public rowData$!: Observable<VideoGridRowItem[]>;
  public totalCountOfRecords!: number;

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  private destoroy$ = new Subject<void>();

  constructor(@Self() private videosService: VideosService, private store: Store) {
    this.totalCountOfRecords = 0;
    this.isSelectionEnable = true;
    this.recordsCount = 0;
    this.defaultColDef = this.setDefaultColDef();
    this.columnDefs = this.getColDefs();
  }

  public ngOnInit(): void {
    this.videosService
      .getVideos()
      .pipe(map(mapItemsToVideos), takeUntil(this.destoroy$))
      .subscribe((videos) => {
        this.totalCountOfRecords = videos.length;
        this.store.dispatch(Actions.putVideosToStore({ videos }));
      });
    this.rowData$ = this.store.select(selectVideos);
  }

  public ngOnDestroy(): void {
    this.destoroy$.next();
    this.destoroy$.complete();
  }

  public onSelectionChanged(event: SelectionChangedEvent): void {
    this.recordsCount = event.api.getSelectedRows().length;
  }

  public onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
  }

  public toggleSelectionMode(): void {
    const selectionColumn = this.gridColumnApi.getColumn(COL_FIELDS.CHECKBOX_SELECTION);

    if (!selectionColumn) return;

    this.isSelectionEnable = !this.isSelectionEnable;
    this.toggleCheckboxSelection(this.isSelectionEnable);
    this.gridColumnApi.setColumnVisible(selectionColumn, this.isSelectionEnable);
  }

  public getContextMenuItems(params: GetContextMenuItemsParams): (string | MenuItemDef)[] {
    const colId = params.column?.getColId();
    const customMenuItem: MenuItemDef = {
      name: 'Open in new tab',
      /* eslint-env browser */
      action: () => window.open(YOUTUBE_VIDEO_BASE_URL + params.node?.data?.id),
    };
    const menuItems: (string | MenuItemDef)[] = ['copy', 'copyWithHeaders', 'paste'];
    return colId !== COL_FIELDS.TITLE ? menuItems : [...menuItems, customMenuItem];
  }

  private toggleCheckboxSelection(isEnable: boolean): void {
    const columnDefs = this.getColDefs();
    const [selectionColDef] = columnDefs;
    selectionColDef.checkboxSelection = isEnable;
    selectionColDef.headerCheckboxSelection = isEnable;
    this.gridApi.deselectAll();
    this.gridApi.setColumnDefs(columnDefs);
  }

  private setDefaultColDef(): ColDef {
    return { ...DEFAULT_COL_DEF };
  }

  private getColDefs(): ColDef[] {
    const mapColFields = (field: COL_FIELDS): ColDef => {
      switch (field) {
        case COL_FIELDS.CHECKBOX_SELECTION:
          return {
            headerName: COL_HEADER_NAMES.CHECKBOX_SELECTION,
            headerCheckboxSelection: this.isSelectionEnable,
            checkboxSelection: this.isSelectionEnable,
            flex: 0,
            width: 0,
            minWidth: 50,
            colId: COL_FIELDS.CHECKBOX_SELECTION,
          };
        case COL_FIELDS.THUMBNAIL:
          return {
            field,
            headerName: COL_HEADER_NAMES.THUMBNAIL,
            cellRenderer: thumbnailRenderer,
          };
        case COL_FIELDS.PUBLISHED_AT:
          return { field, headerName: COL_HEADER_NAMES.PUBLISHED_AT };
        case COL_FIELDS.TITLE:
          return { field, headerName: COL_HEADER_NAMES.TITLE, cellRenderer: titleRenderer, colId: COL_FIELDS.TITLE };
        case COL_FIELDS.DESCRIPTION:
          return {
            field,
            headerName: COL_HEADER_NAMES.DESCRIPTION,
          };
        default:
          return {};
      }
    };

    return Object.values(COL_FIELDS).map(mapColFields);
  }
}
