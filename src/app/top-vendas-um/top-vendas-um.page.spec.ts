import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TopVendasUmPage } from './top-vendas-um.page';

describe('TopVendasUmPage', () => {
  let component: TopVendasUmPage;
  let fixture: ComponentFixture<TopVendasUmPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(TopVendasUmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
