import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LibroFormService } from './libro-form.service';
import { LibroService } from '../service/libro.service';
import { ILibro } from '../libro.model';
import { IAutor } from 'app/entities/autor/autor.model';
import { AutorService } from 'app/entities/autor/service/autor.service';

import { LibroUpdateComponent } from './libro-update.component';

describe('Libro Management Update Component', () => {
  let comp: LibroUpdateComponent;
  let fixture: ComponentFixture<LibroUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let libroFormService: LibroFormService;
  let libroService: LibroService;
  let autorService: AutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), LibroUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(LibroUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LibroUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    libroFormService = TestBed.inject(LibroFormService);
    libroService = TestBed.inject(LibroService);
    autorService = TestBed.inject(AutorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Autor query and add missing value', () => {
      const libro: ILibro = { id: 456 };
      const autor: IAutor = { id: 8185 };
      libro.autor = autor;

      const autorCollection: IAutor[] = [{ id: 24910 }];
      jest.spyOn(autorService, 'query').mockReturnValue(of(new HttpResponse({ body: autorCollection })));
      const additionalAutors = [autor];
      const expectedCollection: IAutor[] = [...additionalAutors, ...autorCollection];
      jest.spyOn(autorService, 'addAutorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ libro });
      comp.ngOnInit();

      expect(autorService.query).toHaveBeenCalled();
      expect(autorService.addAutorToCollectionIfMissing).toHaveBeenCalledWith(
        autorCollection,
        ...additionalAutors.map(expect.objectContaining)
      );
      expect(comp.autorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const libro: ILibro = { id: 456 };
      const autor: IAutor = { id: 10147 };
      libro.autor = autor;

      activatedRoute.data = of({ libro });
      comp.ngOnInit();

      expect(comp.autorsSharedCollection).toContain(autor);
      expect(comp.libro).toEqual(libro);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILibro>>();
      const libro = { id: 123 };
      jest.spyOn(libroFormService, 'getLibro').mockReturnValue(libro);
      jest.spyOn(libroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ libro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: libro }));
      saveSubject.complete();

      // THEN
      expect(libroFormService.getLibro).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(libroService.update).toHaveBeenCalledWith(expect.objectContaining(libro));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILibro>>();
      const libro = { id: 123 };
      jest.spyOn(libroFormService, 'getLibro').mockReturnValue({ id: null });
      jest.spyOn(libroService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ libro: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: libro }));
      saveSubject.complete();

      // THEN
      expect(libroFormService.getLibro).toHaveBeenCalled();
      expect(libroService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILibro>>();
      const libro = { id: 123 };
      jest.spyOn(libroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ libro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(libroService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAutor', () => {
      it('Should forward to autorService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(autorService, 'compareAutor');
        comp.compareAutor(entity, entity2);
        expect(autorService.compareAutor).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
