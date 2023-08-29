import { ICliente, NewCliente } from './cliente.model';

export const sampleWithRequiredData: ICliente = {
  id: 1342,
};

export const sampleWithPartialData: ICliente = {
  id: 13505,
};

export const sampleWithFullData: ICliente = {
  id: 1107,
  razonSocial: 'Rioja optimizada',
  correo: 'Productor Granito Cantabria',
};

export const sampleWithNewData: NewCliente = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
