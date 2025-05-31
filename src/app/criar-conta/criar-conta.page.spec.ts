import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CriarContaPage } from './criar-conta.page';

describe('CriarContaPage', () => {
  let component: CriarContaPage;
  let fixture: ComponentFixture<CriarContaPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(CriarContaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
