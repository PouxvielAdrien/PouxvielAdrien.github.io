/* WEATHER FORECAST (CITY) TEST */

/* Import the application components and services */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser"
import { DebugElement } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForecastComponent } from './forecast.component';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ForecastComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Check if the spy function is not executed because the button is disabled since the form is not valid */
  it('should have call the ShowForecast method', async() => {
    fixture.detectChanges();
    spyOn(component, 'ShowForecast');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.ShowForecast).toHaveBeenCalledTimes(0);
  });

  /* Expect the form valid property to be false */
  it('form should be invalid when empty', async() => {
    expect(component.forecastForm).toBeFalsy();
  });

  /* Set values to the form and expect the form valid property to be true */
  it('form should be valid', async() => {
    component.forecastForm = new FormGroup({
      'weatherCity': new FormControl('Paris'),
      'weatherUnit': new FormControl('metric'),
      'weatherLang': new FormControl('en')});
    expect(component.forecastForm).toBeTruthy();
  });
});
