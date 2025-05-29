import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopVendasDoisPage } from './top-vendas-dois.page';

describe('TopVendasDoisPage', () => {
  let component: TopVendasDoisPage;
  let fixture: ComponentFixture<TopVendasDoisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopVendasDoisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
