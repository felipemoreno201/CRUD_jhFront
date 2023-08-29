import { ILibro, NewLibro } from './libro.model';

export const sampleWithRequiredData: ILibro = {
  id: 11909,
};

export const sampleWithPartialData: ILibro = {
  id: 29665,
  descripcion: 'Diseñador',
  precio: 21257,
  categoria: 'Rojo Administrador',
};

export const sampleWithFullData: ILibro = {
  id: 14472,
  titulo: 'Deportes Supervisor',
  descripcion: 'Negro Algodón Algodón',
  precio: 9511,
  categoria: 'Bricolaje Verde',
};

export const sampleWithNewData: NewLibro = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
