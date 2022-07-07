/* WEATHER SERVICE TEST */

/* Import the application components and services */
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let fakefetch:any;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* Expect the fetch reponse to be true */
  it('fetch method work', async() => {
    fakefetch = jasmine.createSpy('Fetch').and.returnValue(service.ok);
    //fakefetch = spyOn(service, 'Fetch').and.returnValue
    expect(fakefetch.valueOf).toBeTruthy();
  })
});
