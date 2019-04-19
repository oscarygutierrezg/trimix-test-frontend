import { Actions, CREATE_TIPODOCUMENTO } from './../actions/tipo-documento.actions';
import { TipoDocumento } from '../model/tipo-documento';

const initialState1: TipoDocumento = {
    descripcion: 'Dni',
};

const initialState2: TipoDocumento = {
    descripcion: 'Pasaporte',
};

const initialState3: TipoDocumento = {
    descripcion: 'Cédula',
};

export function reducer(
    state: TipoDocumento[] = [initialState1, initialState2, initialState3],
    action: Actions) {

    switch (action.type) {
        case CREATE_TIPODOCUMENTO:
            return [...state, action.payload];

        default:
            return state;
    }
}
