import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LibroFormService, LibroFormGroup } from './libro-form.service';
import { ILibro } from '../libro.model';
import { LibroService } from '../service/libro.service';
import { IAutor } from 'app/entities/autor/autor.model';
import { AutorService } from 'app/entities/autor/service/autor.service';

@Component({
  standalone: true,
  selector: 'jhi-libro-update',
  templateUrl: './libro-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LibroUpdateComponent implements OnInit {
  isSaving = false;
  libro: ILibro | null = null;

  autorsSharedCollection: IAutor[] = [];

  editForm: LibroFormGroup = this.libroFormService.createLibroFormGroup();

  constructor(
    protected libroService: LibroService,
    protected libroFormService: LibroFormService,
    protected autorService: AutorService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAutor = (o1: IAutor | null, o2: IAutor | null): boolean => this.autorService.compareAutor(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ libro }) => {
      this.libro = libro;
      if (libro) {
        this.updateForm(libro);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const libro = this.libroFormService.getLibro(this.editForm);
    if (libro.id !== null) {
      this.subscribeToSaveResponse(this.libroService.update(libro));
    } else {
      this.subscribeToSaveResponse(this.libroService.create(libro));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILibro>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(libro: ILibro): void {
    this.libro = libro;
    this.libroFormService.resetForm(this.editForm, libro);

    this.autorsSharedCollection = this.autorService.addAutorToCollectionIfMissing<IAutor>(this.autorsSharedCollection, libro.autor);
  }

  protected loadRelationshipsOptions(): void {
    this.autorService
      .query()
      .pipe(map((res: HttpResponse<IAutor[]>) => res.body ?? []))
      .pipe(map((autors: IAutor[]) => this.autorService.addAutorToCollectionIfMissing<IAutor>(autors, this.libro?.autor)))
      .subscribe((autors: IAutor[]) => (this.autorsSharedCollection = autors));
  }
}
