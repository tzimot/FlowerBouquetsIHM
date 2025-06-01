import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TopVendasPage } from './top-vendas.page';

describe('TopVendasPage', () => {
  let component: TopVendasPage;
  let fixture: ComponentFixture<TopVendasPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(TopVendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
