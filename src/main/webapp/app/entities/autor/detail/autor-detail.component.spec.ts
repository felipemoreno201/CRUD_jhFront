import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AutorDetailComponent } from './autor-detail.component';

describe('Autor Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: AutorDetailComponent,
              resolve: { autor: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding()
        ),
      ],
    })
      .overrideTemplate(AutorDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load autor on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AutorDetailComponent);

      // THEN
      expect(instance.autor).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
