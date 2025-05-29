import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaEncomendaTresPage } from './nova-encomenda-tres.page';

describe('NovaEncomendaTresPage', () => {
  let component: NovaEncomendaTresPage;
  let fixture: ComponentFixture<NovaEncomendaTresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NovaEncomendaTresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
