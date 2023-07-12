import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { List } from './models/weather.model';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, throttle, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private weatherService: WeatherService,
    public translate: TranslateService
  ) {
    translate.addLangs(['sl', 'en']);
    translate.setDefaultLang('sl');
  }

  weatherData?: List[];
  isLoading?: boolean;
  isError?: boolean;
  currentDate = () => moment().format(`DD.MM.YYYY, HH:mm`);

  throttleGetData = fromEvent(document, 'click').pipe(
    throttle(() => interval(1000))
  );

  getTempInCelsius = (temp: number) => temp - 274.15;

  getData() {
    this.weatherService.getWeatherData(this.translate.currentLang).subscribe({
      next: (response) => {
        this.weatherData = response.list;
        this.isLoading = false;
        this.currentDate();
      },
      error: () => {
        this.isError = true;
      },
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    this.getData();
    this.throttleGetData.subscribe((event) => {
      if (
        event.target instanceof Element &&
        event.target.className === 'refresh'
      ) {
        this.getData();
      }
    });
  }
}
