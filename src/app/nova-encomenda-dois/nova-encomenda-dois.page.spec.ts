import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaEncomendaDoisPage } from './nova-encomenda-dois.page';

describe('NovaEncomendaDoisPage', () => {
  let component: NovaEncomendaDoisPage;
  let fixture: ComponentFixture<NovaEncomendaDoisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NovaEncomendaDoisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}
