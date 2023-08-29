import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../libro.test-samples';

import { LibroFormService } from './libro-form.service';

describe('Libro Form Service', () => {
  let service: LibroFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroFormService);
  });

  describe('Service methods', () => {
    describe('createLibroFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLibroFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titulo: expect.any(Object),
            descripcion: expect.any(Object),
            precio: expect.any(Object),
            categoria: expect.any(Object),
            autor: expect.any(Object),
          })
        );
      });

      it('passing ILibro should create a new form with FormGroup', () => {
        const formGroup = service.createLibroFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titulo: expect.any(Object),
            descripcion: expect.any(Object),
            precio: expect.any(Object),
            categoria: expect.any(Object),
            autor: expect.any(Object),
          })
        );
      });
    });

    describe('getLibro', () => {
      it('should return NewLibro for default Libro initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLibroFormGroup(sampleWithNewData);

        const libro = service.getLibro(formGroup) as any;

        expect(libro).toMatchObject(sampleWithNewData);
      });

      it('should return NewLibro for empty Libro initial value', () => {
        const formGroup = service.createLibroFormGroup();

        const libro = service.getLibro(formGroup) as any;

        expect(libro).toMatchObject({});
      });

      it('should return ILibro', () => {
        const formGroup = service.createLibroFormGroup(sampleWithRequiredData);

        const libro = service.getLibro(formGroup) as any;

        expect(libro).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILibro should not enable id FormControl', () => {
        const formGroup = service.createLibroFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLibro should disable id FormControl', () => {
        const formGroup = service.createLibroFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
