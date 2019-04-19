    // tslint:disable-next-line:max-line-length
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Persona } from '../model/persona';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private personasUrl = '/api/personas';
  personasChangeObs = new Subject<Persona[]>();


  constructor(
    private http: HttpClient
  ) { }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(environment.api + this.personasUrl)
      .pipe(
        tap(_ => {
          this.personasChangeObs.next(_);
          this.log('fetched Personas');
        }),
        catchError(this.handleError<Persona[]>('getPersonas', []))
      );
  }

  getPersonasByFilter(personaFilter: Persona): Observable<Persona[]> {
    const filterNombre = personaFilter.nombre ? personaFilter.nombre : 'X';
    const filterTipoDocumento = personaFilter.tipoDocumento  ? personaFilter.tipoDocumento : 'X';
    let url = environment.api + this.personasUrl;
    if (filterNombre !== 'X' || filterTipoDocumento !== 'Todos') {
      url += '/' + filterNombre + '/' + filterTipoDocumento;
    }
    return this.http.get<Persona[]>(url
    )
      .pipe(
        tap(_ => {
          this.personasChangeObs.next(_);
          this.log('fetched Personas');
        }),
        catchError(this.handleError<Persona[]>('getPersonas', []))
      );
  }

  addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(environment.api + this.personasUrl, persona, httpOptions).pipe(
      tap((newTodo: Persona) => this.log(`added Persona w/ id=${newTodo.id}`)),
      catchError(this.handleError<Persona>('addPersona'))
    );
  }

  updatePersona(persona: Persona): Observable<any> {
    return this.http.put(environment.api + this.personasUrl , persona , httpOptions).pipe(
      tap(_ => this.log(`updated Persona id=${JSON.stringify(persona)}`)),
      catchError(this.handleError<any>('updatePersona'))
    );
  }

  deletePersona(persona: Persona): Observable<any> {
    return this.http.delete(environment.api + this.personasUrl + '/' + persona.id , httpOptions).pipe(
      tap(_ => {
        this.log(`delete Persona id=${persona.id}`);
        this.getPersonas().subscribe(personas => {
        });
      }),
      catchError(this.handleError<any>('deletePersona'))
    );
  }

  getPersona(id: string): Observable<Persona> {
    return this.http.get(environment.api + this.personasUrl + '/' + id , httpOptions).pipe(
      tap(_ => {
        this.log(`get Persona ${JSON.stringify(_)}`);
        this.getPersonas().subscribe(personas => {
        });
      }),
      catchError(this.handleError<any>('deletePersona'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     this.log(`${operation} failed: ${error.message}`);
     return of(result as T);
    };
  }
  private log(message: string) {

  }
}
