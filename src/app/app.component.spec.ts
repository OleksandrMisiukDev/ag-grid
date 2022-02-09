import { Column, GridReadyEvent } from 'ag-grid-community';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AgGridModule } from 'ag-grid-angular';

import { mockColumnDefs, mockInitialState, mockItems } from './shared/mock-data.constants';
import { AppComponent } from './app.component';
import { DEFAULT_COL_DEF } from './shared/column-defs.constants';
import { VideosService } from './services/videos.service';
import { of } from 'rxjs';
import { selectVideos } from './store/app-store.selectors';

/* eslint-disable */
describe('AppComponent', () => {
  let mockStore: MockStore;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let videosServiceSpy: jasmine.SpyObj<VideosService> = jasmine.createSpyObj('VideosService', ['getVideos']);
  const mockVideos = mockInitialState.appStore.videos;

  beforeEach(async () => {
    videosServiceSpy.getVideos.and.returnValue(of(mockItems));

    await TestBed.configureTestingModule({
      imports: [AgGridModule.withComponents([])],
      declarations: [AppComponent],
      providers: [provideMockStore({})],
    })
      .overrideComponent(AppComponent, {
        set: { providers: [{ provide: VideosService, useValue: videosServiceSpy }] },
      })
      .compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectVideos, mockVideos);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should define properties when instantiating`, () => {
    expect(component.recordsCount).toBe(0);
    expect(component.isSelectionEnable).toBe(true);
    expect(component.defaultColDef).toEqual(DEFAULT_COL_DEF);
    expect(component.columnDefs).toEqual(mockColumnDefs);
  });

  describe('ngOnInit', () => {
    it('should fetch data after component initialized', () => {
      fixture.detectChanges();
      expect(component.totalCountOfRecords).toBeDefined();
      expect(videosServiceSpy.getVideos.calls.any()).toBe(true);
    });

    it('should select videos from store', (done: DoneFn) => {
      fixture.detectChanges();
      component.rowData$.subscribe({
        next: (videos) => {
          expect(videos).toEqual(mockVideos);
          done();
        },
        error: (err) => done.fail('expected videos, not error'),
      });
    });
  });

  describe('Ag Grid', () => {
    it('the grid cells should be as expected', () => {
      fixture.detectChanges();
      const appElement = fixture.nativeElement;
      const cellElements = appElement.querySelectorAll('.ag-cell-value');

      expect(cellElements.length).toEqual(15);
      expect(cellElements[0].textContent).toEqual('');
      expect(cellElements[1].textContent).toEqual('');
      expect(cellElements[2].textContent).toEqual('Wed Feb 02 2022');
      expect(cellElements[3].textContent).toEqual('');
      expect(cellElements[4].textContent).toEqual('description');
      expect(cellElements[5].textContent).toEqual('');
      expect(cellElements[6].textContent).toEqual('');
      expect(cellElements[7].textContent).toEqual('Wed Feb 02 2022');
      expect(cellElements[8].textContent).toEqual('');
      expect(cellElements[9].textContent).toEqual('description');
      expect(cellElements[10].textContent).toEqual('');
      expect(cellElements[11].textContent).toEqual('');
      expect(cellElements[12].textContent).toEqual('Wed Feb 02 2022');
      expect(cellElements[13].textContent).toEqual('');
      expect(cellElements[14].textContent).toEqual('description');
    });
  });

  describe('onGridReady', () => {
    it('should get grid API instance', () => {
      fixture.detectChanges();
      component.onGridReady({ api: {}, columnApi: {} } as GridReadyEvent);
      // @ts-ignore:next-line
      expect(component.gridApi).toBeDefined();
      // @ts-ignore:next-line
      expect(component.gridColumnApi).toBeDefined();
    });
  });

  describe('toggleSelectionMode', () => {
    it('should change the selection state', () => {
      const result = !component.isSelectionEnable;
      component.onGridReady({
        api: {
          deselectAll: () => {
            return;
          },
          setColumnDefs: (colDefs) => {
            return;
          },
        },
        columnApi: {
          getColumn: (key) => ({} as Column),
          setColumnVisible: (key, visible) => {
            return;
          },
        },
      } as GridReadyEvent);
      component.toggleSelectionMode();
      expect(component.isSelectionEnable).toBe(result);
    });
  });
});
