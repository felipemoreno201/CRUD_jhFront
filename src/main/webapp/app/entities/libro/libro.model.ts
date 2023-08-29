import { IAutor } from 'app/entities/autor/autor.model';

export interface ILibro {
  id: number;
  titulo?: string | null;
  descripcion?: string | null;
  precio?: number | null;
  categoria?: string | null;
  autor?: Pick<IAutor, 'id'> | null;
}

export type NewLibro = Omit<ILibro, 'id'> & { id: null };
