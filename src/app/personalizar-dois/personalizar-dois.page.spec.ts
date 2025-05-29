import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalizarDoisPage } from './personalizar-dois.page';

describe('PersonalizarDoisPage', () => {
  let component: PersonalizarDoisPage;
  let fixture: ComponentFixture<PersonalizarDoisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonalizarDoisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
