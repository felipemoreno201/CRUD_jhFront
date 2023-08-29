import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILibro, NewLibro } from '../libro.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILibro for edit and NewLibroFormGroupInput for create.
 */
type LibroFormGroupInput = ILibro | PartialWithRequiredKeyOf<NewLibro>;

type LibroFormDefaults = Pick<NewLibro, 'id'>;

type LibroFormGroupContent = {
  id: FormControl<ILibro['id'] | NewLibro['id']>;
  titulo: FormControl<ILibro['titulo']>;
  descripcion: FormControl<ILibro['descripcion']>;
  precio: FormControl<ILibro['precio']>;
  categoria: FormControl<ILibro['categoria']>;
  autor: FormControl<ILibro['autor']>;
};

export type LibroFormGroup = FormGroup<LibroFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LibroFormService {
  createLibroFormGroup(libro: LibroFormGroupInput = { id: null }): LibroFormGroup {
    const libroRawValue = {
      ...this.getFormDefaults(),
      ...libro,
    };
    return new FormGroup<LibroFormGroupContent>({
      id: new FormControl(
        { value: libroRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      titulo: new FormControl(libroRawValue.titulo),
      descripcion: new FormControl(libroRawValue.descripcion),
      precio: new FormControl(libroRawValue.precio),
      categoria: new FormControl(libroRawValue.categoria),
      autor: new FormControl(libroRawValue.autor),
    });
  }

  getLibro(form: LibroFormGroup): ILibro | NewLibro {
    return form.getRawValue() as ILibro | NewLibro;
  }

  resetForm(form: LibroFormGroup, libro: LibroFormGroupInput): void {
    const libroRawValue = { ...this.getFormDefaults(), ...libro };
    form.reset(
      {
        ...libroRawValue,
        id: { value: libroRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LibroFormDefaults {
    return {
      id: null,
    };
  }
}
