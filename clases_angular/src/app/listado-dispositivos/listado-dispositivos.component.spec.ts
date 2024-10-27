import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDispositivosComponent } from './listado-dispositivos.component';

describe('ListadoDispositivosComponent', () => {
  let component: ListadoDispositivosComponent;
  let fixture: ComponentFixture<ListadoDispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDispositivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
