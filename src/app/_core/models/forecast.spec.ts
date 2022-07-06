import { Forecast } from './forecast';

 describe('Forecast', () => {
  it('should create an instance', () => {
    expect(new Forecast("day",'icon','max','min')).toBeTruthy();
  });
});


