import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'; // Corrigido import
import { TopVendasDoisPage } from './top-vendas-dois.page';

describe('TopVendasDoisPage', () => {
  let component: TopVendasDoisPage;
  let fixture: ComponentFixture<TopVendasDoisPage>;

  beforeEach(waitForAsync(() => { // Usar waitForAsync para testes assíncronos Angular
    fixture = TestBed.createComponent(TopVendasDoisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
