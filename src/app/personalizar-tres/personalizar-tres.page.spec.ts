import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalizarTresPage } from './personalizar-tres.page';

describe('PersonalizarTresPage', () => {
  let component: PersonalizarTresPage;
  let fixture: ComponentFixture<PersonalizarTresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonalizarTresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
