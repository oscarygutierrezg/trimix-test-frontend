import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { TipoDocumento } from '../model/tipo-documento';

export const CREATE_TIPODOCUMENTO = 'TipoDocumento_Create';

export class CreateTipoDocumento implements Action {
    readonly type = CREATE_TIPODOCUMENTO;

    constructor(public payload: TipoDocumento) { }
}


export type Actions = CreateTipoDocumento;
