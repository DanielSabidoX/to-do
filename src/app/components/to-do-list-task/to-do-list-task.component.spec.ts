import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListTaskComponent } from './to-do-list-task.component';

describe('ToDoListTaskComponent', () => {
  let component: ToDoListTaskComponent;
  let fixture: ComponentFixture<ToDoListTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDoListTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoListTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
