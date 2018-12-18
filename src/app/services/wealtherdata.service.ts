import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlOptions } from '../common/common.model';


@Injectable({
  providedIn: 'root'
})
export class WealtherdataService {



  API_URL = "https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/"

  constructor(private http: HttpClient) { }

  /**
   * Get weather data
   * @param options 
   */
  getWeatherData(options: urlOptions) {
    return this.http.get(this.API_URL + options.metric+"-"+options.location+".json");
  }

}
