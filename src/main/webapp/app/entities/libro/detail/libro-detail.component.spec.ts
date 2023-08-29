import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LibroDetailComponent } from './libro-detail.component';

describe('Libro Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LibroDetailComponent,
              resolve: { libro: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding()
        ),
      ],
    })
      .overrideTemplate(LibroDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load libro on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LibroDetailComponent);

      // THEN
      expect(instance.libro).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
