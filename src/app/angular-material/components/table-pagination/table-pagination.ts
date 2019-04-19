import { Persona } from './../../../model/persona';
import {Component, OnInit, ViewChild, Input, OnDestroy} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { PersonaService } from 'src/app/services/persona.service';
import { TipoDocumento } from 'src/app/model/tipo-documento';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-table-pagination',
  styleUrls: ['table-pagination.css'],
  templateUrl: 'table-pagination.html',
})

export class TablePaginationComponent implements OnInit, OnDestroy  {

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'numeroDocumento', 'tipoDocumento', 'fechaNacimiento', 'cambio'];
  dataSource: any;
  private personas: Persona[];
  private ids: number[] = [];
  private personasChangeObs: Subscription;

  constructor(
    private router: Router,
    private personaService: PersonaService,
    private dialog: MatDialog) {
    }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.personasChangeObs = this.personaService.personasChangeObs.subscribe( (personas: Persona[]) => {
        if ( this.ids.length === 0 ) {
          personas.forEach( t => {
            this.ids.push(t.id);
          });
        }
        this.personas = personas;
        this.dataSource = new MatTableDataSource<Persona>(this.personas);
        this.dataSource.paginator = this.paginator;
    });
  }


  ngOnDestroy() {
    this.personasChangeObs.unsubscribe();
  }

  buscar() {
    this.personaService.getPersonas().subscribe(todos => {
      console.log(JSON.stringify(todos));
    });
  }

  borrar(persona: Persona) {
    this.personaService.deletePersona(persona).subscribe(res => {
      console.log(JSON.stringify(res));
    });
  }

  editar(id: number) {
    this.router.navigateByUrl('/edit/'+id);
  }

  onConfirmCancel(persona: Persona) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atención',
        body: 'Está seguro de eliminar la persona?',
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.borrar(persona)
      }
    });
  }

}


