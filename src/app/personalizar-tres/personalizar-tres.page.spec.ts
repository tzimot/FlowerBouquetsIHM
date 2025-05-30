import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PersonalizarTresPage } from './personalizar-tres.page';

describe('PersonalizarTresPage', () => {
  let component: PersonalizarTresPage;
  let fixture: ComponentFixture<PersonalizarTresPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(PersonalizarTresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
