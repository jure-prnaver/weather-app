import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherData(lang?: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/forecast?q=maribor&appid=${
        environment.weatherApiKey
      }&lang=${lang ?? 'sl'}`
    );
  }
}
