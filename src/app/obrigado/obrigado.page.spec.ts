import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObrigadoPage } from './obrigado.page';

describe('ObrigadoPage', () => {
  let component: ObrigadoPage;
  let fixture: ComponentFixture<ObrigadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ObrigadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
