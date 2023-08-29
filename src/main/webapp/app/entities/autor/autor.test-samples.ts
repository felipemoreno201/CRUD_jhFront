import { IAutor, NewAutor } from './autor.model';

export const sampleWithRequiredData: IAutor = {
  id: 3461,
};

export const sampleWithPartialData: IAutor = {
  id: 9268,
  nombre: 'Contabilidad Pakistan',
};

export const sampleWithFullData: IAutor = {
  id: 21474,
  nombre: 'Gris',
  correo: 'Andalucía Marfil Monitorizado',
  pais: 'Cara Madera',
};

export const sampleWithNewData: NewAutor = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
