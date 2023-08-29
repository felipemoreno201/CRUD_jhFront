import dayjs from 'dayjs/esm';
import { ICliente } from 'app/entities/cliente/cliente.model';

export interface IVenta {
  id: number;
  folio?: string | null;
  fecha?: dayjs.Dayjs | null;
  subtotal?: number | null;
  impuesto?: number | null;
  total?: number | null;
  cliente?: Pick<ICliente, 'id'> | null;
}

export type NewVenta = Omit<IVenta, 'id'> & { id: null };
