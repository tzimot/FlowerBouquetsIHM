import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalizarRamoPage } from './personalizar-ramo.page';

describe('PersonalizarRamoPage', () => {
  let component: PersonalizarRamoPage;
  let fixture: ComponentFixture<PersonalizarRamoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalizarRamoPage]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalizarRamoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
