import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaEncomendaUmPage } from './nova-encomenda-um.page';

describe('NovaEncomendaUmPage', () => {
  let component: NovaEncomendaUmPage;
  let fixture: ComponentFixture<NovaEncomendaUmPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NovaEncomendaUmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
