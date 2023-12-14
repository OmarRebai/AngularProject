import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsCreateComponent } from './tools-create.component';

describe('ToolsCreateComponent', () => {
  let component: ToolsCreateComponent;
  let fixture: ComponentFixture<ToolsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolsCreateComponent]
    });
    fixture = TestBed.createComponent(ToolsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
