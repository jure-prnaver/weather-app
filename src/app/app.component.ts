import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { List, WeatherData } from './models/weather.model';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  weatherData?: List[];

  currentDate = moment().format('DD.MM.YYYY [ob] HH:mm');

  getTempInCelsius = (temp: number) => temp - 274.15;

  ngOnInit(): void {
    this.weatherService.getWeatherData().subscribe({
      next: (response) => {
        this.weatherData = response.list;
      },
    });
  }
}
