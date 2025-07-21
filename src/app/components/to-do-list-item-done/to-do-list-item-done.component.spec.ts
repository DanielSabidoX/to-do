import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListItemDoneComponent } from './to-do-list-item-done.component';

describe('ToDoListItemDoneComponent', () => {
  let component: ToDoListItemDoneComponent;
  let fixture: ComponentFixture<ToDoListItemDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDoListItemDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoListItemDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
