import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TopVendasPage } from './top-vendas.page';

describe('TopVendasPage', () => {
  let component: TopVendasPage;
  let fixture: ComponentFixture<TopVendasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TopVendasPage],
      // add imports/providers here if needed
    }).compileComponents();

    fixture = TestBed.createComponent(TopVendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
