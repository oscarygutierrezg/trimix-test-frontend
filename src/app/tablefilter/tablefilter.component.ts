import { Component, OnInit } from '@angular/core';
import { Persona } from '../model/persona';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../model/tipo-documento';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-tablefilter',
  templateUrl: './tablefilter.component.html',
  styleUrls: ['./tablefilter.component.css']
})
export class TablefilterComponent implements OnInit {

  personaFilter: Persona;
  tipoDocumentos: Observable<TipoDocumento[]>;

  constructor(
      private personaService: PersonaService,
      private store: Store<AppState>) {
    this.tipoDocumentos = this.store.select('tipoDocumento');
  }

  ngOnInit() {
    this.personaFilter = new Persona();
    this.personaFilter.tipoDocumento = 'Todos';
  }

  filtrar() {
    this.personaService.getPersonasByFilter(this.personaFilter).subscribe(todos => {
      console.log(JSON.stringify(todos));
    });
  }

}
