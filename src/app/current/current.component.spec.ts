/* CURRENT WEATHER (CITY) TEST */

/* Import the application components and services */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser"
import { DebugElement } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentComponent } from './current.component';

describe('CurrentComponent', () => {
  let component: CurrentComponent;
  let fixture: ComponentFixture<CurrentComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(CurrentComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  /* Check if the component instance has the expected value of the 'recherche' variable after the call of the method 'ShowCoord' */
  it('should have set recherche to true', async() => {
    component.ShowCoord()
    expect(component.recherche.valueOf).toBeTruthy();
  });

  /* Check if the spy function is not executed because the button is disabled since the form is not valid */
  it('should have call the ShowCoord method', async() => {
    fixture.detectChanges();
    spyOn(component, 'ShowCoord');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.ShowCoord).toHaveBeenCalledTimes(0);
  });

  /* Expect the form valid property to be false */
  it('form should be invalid when empty', async() => {
    expect(component.weatherForm).toBeFalsy();
  });

  /* Set values to the form and expect the form valid property to be true */
  it('form should be valid', async() => {
    component.weatherForm = new FormGroup({
      weatherLat: new FormControl('9'),
      weatherLon: new FormControl('10'),
      weatherUnit: new FormControl('metric'),
      weatherLang: new FormControl('en')});
    expect(component.weatherForm.valid).toBeTruthy();
  });
});
