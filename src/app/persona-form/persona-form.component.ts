/* tslint:disable: member-ordering forin */
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';

import { Persona } from '../model/persona';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from '../services/persona.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../model/tipo-documento';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css'],
})
export class PersonaFormComponent implements OnInit {

  persona: Persona;
  personaForm: FormGroup;
  nameCtrl: FormControl;
  lastNameCtrl: FormControl;
  documentNumberCtrl: FormControl;
  birthDateCtrl: FormControl;
  tipoCtrl: FormControl;
  tipoDocumentos: Observable<TipoDocumento[]>;
  idPersona: string;


  @ViewChild('myDateInput')
  myDateInputElementRef: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personaService: PersonaService,
    private store: Store<AppState>) {
      this.tipoDocumentos = this.store.select('tipoDocumento');
    }


  ngOnInit(): void {

    this.idPersona = this.route.snapshot.paramMap.get('id');

    if (this.idPersona) {
      this.personaService.getPersona(this.idPersona).subscribe(persona => {
        this.persona = persona;
        this.setFormControl();
        this.persona.fechaNacimiento = this.formatDate(new Date(persona.fechaNacimiento));
      });
    } else {
      this.persona = new Persona();
      this.setFormControl();
    }
    this.setMaxDate();
  }

  setFormControl(){
    this.nameCtrl = new FormControl(this.persona.nombre, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),

    this.lastNameCtrl = new FormControl(this.persona.apellido, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    this.tipoCtrl = new FormControl(this.persona.tipoDocumento, Validators.required);
    this.birthDateCtrl = new FormControl(this.persona.fechaNacimiento, Validators.required);
    this.documentNumberCtrl = new FormControl(this.persona.numeroDocumento, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(15)
    ]);
    this.personaForm = new FormGroup({
      name: this.nameCtrl ,
      lastName: this.lastNameCtrl ,
      documentNumber: this.documentNumberCtrl ,
      documentType: this.tipoCtrl,
      birthDate: this.birthDateCtrl
    }, );
  }

  setMaxDate() {
    if ( this.myDateInputElementRef ) {
      this.myDateInputElementRef.nativeElement.setAttribute('max', this.formatDate(new Date()));
    }
  }

  formatDate(d: Date): string {
    const dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate().toString();
    const mm = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
    const yyyy = d.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  guardar() {
    if (this.idPersona) {
      this.personaService.updatePersona(this.persona)
    .subscribe(persona => {
      console.log(JSON.stringify(persona));
      this.router.navigateByUrl('/');
    });

    } else {
    this.persona.id = undefined;
    this.personaService.addPersona(this.persona)
    .subscribe(persona => {
      console.log(JSON.stringify(persona));
      this.router.navigateByUrl('/');
    });
  }
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

}
