export interface User {
  username: string;
  _id: string;
  cities: string[];
  created_date: string;
  updated_date: string;
}

export interface Forecast {
  date: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    daily_chance_of_rain: string;
  };
}

export interface Weather {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_mph: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    uv: number;
  };
  forecast: {
    forecastday: Forecast[];
  };
}
