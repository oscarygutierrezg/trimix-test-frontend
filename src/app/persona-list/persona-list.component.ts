import { PersonaService } from '../services/persona.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../model/persona';
import { Router } from '@angular/router';
import { TipoDocumento } from '../model/tipo-documento';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { CreateTipoDocumento } from '../actions/tipo-documento.actions';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {
  private personas: Persona[];
  constructor(
    private router: Router,
    private personaService: PersonaService) {
    }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getPersonas()
    .subscribe(personas => {
      this.personas = personas;
    });
  }

  goNewPersona() {
    this.router.navigateByUrl('/new');
  }

}

