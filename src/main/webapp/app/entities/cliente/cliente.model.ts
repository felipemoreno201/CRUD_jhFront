export interface ICliente {
  id: number;
  razonSocial?: string | null;
  correo?: string | null;
}

export type NewCliente = Omit<ICliente, 'id'> & { id: null };
