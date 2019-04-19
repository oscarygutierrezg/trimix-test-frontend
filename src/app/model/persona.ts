export class Persona {
  id: number;
  nombre: string;
  apellido: string;
  numeroDocumento: number;
  tipoDocumento: string;
  fechaNacimiento: any;

  constructor() {
    this.tipoDocumento = '';
  }

}
