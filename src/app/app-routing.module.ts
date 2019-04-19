import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaFormComponent } from './persona-form/persona-form.component';
import { PersonaListComponent } from './persona-list/persona-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/personas', pathMatch: 'full' },
  {  path: 'personas', component: PersonaListComponent  },
  {  path: 'new', component: PersonaFormComponent  },
  {  path: 'edit/:id', component: PersonaFormComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
