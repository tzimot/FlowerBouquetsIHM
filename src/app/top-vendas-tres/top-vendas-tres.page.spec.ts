import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopVendasTresPage } from './top-vendas-tres.page';

describe('TopVendasTresPage', () => {
  let component: TopVendasTresPage;
  let fixture: ComponentFixture<TopVendasTresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopVendasTresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
