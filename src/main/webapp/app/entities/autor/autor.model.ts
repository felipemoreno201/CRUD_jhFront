export interface IAutor {
  id: number;
  nombre?: string | null;
  correo?: string | null;
  pais?: string | null;
}

export type NewAutor = Omit<IAutor, 'id'> & { id: null };
