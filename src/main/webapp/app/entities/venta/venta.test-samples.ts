import dayjs from 'dayjs/esm';

import { IVenta, NewVenta } from './venta.model';

export const sampleWithRequiredData: IVenta = {
  id: 6478,
};

export const sampleWithPartialData: IVenta = {
  id: 11634,
  subtotal: 14281,
  impuesto: 31492,
  total: 31517,
};

export const sampleWithFullData: IVenta = {
  id: 14543,
  folio: 'Central Rojo',
  fecha: dayjs('2023-08-24'),
  subtotal: 29893,
  impuesto: 471,
  total: 15,
};

export const sampleWithNewData: NewVenta = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
