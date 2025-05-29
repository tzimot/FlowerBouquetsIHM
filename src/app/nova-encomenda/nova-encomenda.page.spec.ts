import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaEncomendaPage } from './nova-encomenda.page';

describe('NovaEncomendaPage', () => {
  let component: NovaEncomendaPage;
  let fixture: ComponentFixture<NovaEncomendaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NovaEncomendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
