import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelarPage } from './cancelar.page';

describe('CancelarPage', () => {
  let component: CancelarPage;
  let fixture: ComponentFixture<CancelarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CancelarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
