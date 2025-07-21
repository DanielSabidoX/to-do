import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Home' 
  },
  { 
    path: 'to-do-list', 
    component: ToDoListComponent,
    title: 'To-Do List' 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
