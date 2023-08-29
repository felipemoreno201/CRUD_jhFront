import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVenta, NewVenta } from '../venta.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVenta for edit and NewVentaFormGroupInput for create.
 */
type VentaFormGroupInput = IVenta | PartialWithRequiredKeyOf<NewVenta>;

type VentaFormDefaults = Pick<NewVenta, 'id'>;

type VentaFormGroupContent = {
  id: FormControl<IVenta['id'] | NewVenta['id']>;
  folio: FormControl<IVenta['folio']>;
  fecha: FormControl<IVenta['fecha']>;
  subtotal: FormControl<IVenta['subtotal']>;
  impuesto: FormControl<IVenta['impuesto']>;
  total: FormControl<IVenta['total']>;
  cliente: FormControl<IVenta['cliente']>;
};

export type VentaFormGroup = FormGroup<VentaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VentaFormService {
  createVentaFormGroup(venta: VentaFormGroupInput = { id: null }): VentaFormGroup {
    const ventaRawValue = {
      ...this.getFormDefaults(),
      ...venta,
    };
    return new FormGroup<VentaFormGroupContent>({
      id: new FormControl(
        { value: ventaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      folio: new FormControl(ventaRawValue.folio),
      fecha: new FormControl(ventaRawValue.fecha),
      subtotal: new FormControl(ventaRawValue.subtotal),
      impuesto: new FormControl(ventaRawValue.impuesto),
      total: new FormControl(ventaRawValue.total),
      cliente: new FormControl(ventaRawValue.cliente),
    });
  }

  getVenta(form: VentaFormGroup): IVenta | NewVenta {
    return form.getRawValue() as IVenta | NewVenta;
  }

  resetForm(form: VentaFormGroup, venta: VentaFormGroupInput): void {
    const ventaRawValue = { ...this.getFormDefaults(), ...venta };
    form.reset(
      {
        ...ventaRawValue,
        id: { value: ventaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VentaFormDefaults {
    return {
      id: null,
    };
  }
}
