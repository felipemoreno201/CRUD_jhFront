import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VentaDetailComponent } from './venta-detail.component';

describe('Venta Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: VentaDetailComponent,
              resolve: { venta: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding()
        ),
      ],
    })
      .overrideTemplate(VentaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load venta on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', VentaDetailComponent);

      // THEN
      expect(instance.venta).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
