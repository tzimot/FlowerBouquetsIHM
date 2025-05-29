import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizarUmPage } from './finalizar-um.page';

describe('FinalizarUmPage', () => {
  let component: FinalizarUmPage;
  let fixture: ComponentFixture<FinalizarUmPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinalizarUmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
