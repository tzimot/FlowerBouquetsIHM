import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalizarUmPage } from './personalizar-um.page';

describe('PersonalizarUmPage', () => {
  let component: PersonalizarUmPage;
  let fixture: ComponentFixture<PersonalizarUmPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonalizarUmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
