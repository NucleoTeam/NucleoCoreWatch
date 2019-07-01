import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesComponent } from './tables.component';
import {ClipboardModule} from 'ngx-clipboard';
import {KeepHtmlPipe} from '../../keep-html.pipe';

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesComponent,
        KeepHtmlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
