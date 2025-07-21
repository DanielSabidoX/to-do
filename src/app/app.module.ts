import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ToDoListItemComponent } from './components/to-do-list-item/to-do-list-item.component';
import { ToDoListTaskComponent } from './components/to-do-list-task/to-do-list-task.component';
import { HomeComponent } from './components/home/home.component';
import { ToDoListItemDoneComponent } from './components/to-do-list-item-done/to-do-list-item-done.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToDoListComponent,
    HomeComponent,
    ToDoListItemComponent,
    ToDoListTaskComponent,
    ToDoListItemDoneComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
