import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CartaoPontosPage } from './cartao-pontos.page';

describe('CartaoPontosPage', () => {
  let component: CartaoPontosPage;
  let fixture: ComponentFixture<CartaoPontosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CartaoPontosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
