export interface User {
  username: string;
  _id: string;
  cities: string[];
  created_date: string;
  updated_date: string;
}

export interface Forecast {
  date: string;
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    is_moon_up: number;
    is_sun_up: number;
  };
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    daily_chance_of_rain: string;
    condition: {
      text: string;
      icon: string;
    };
  };
  hour: {
    time: string;
    temp_c: number;
    temp_f: number;
    condition: {
      icon: string;
    };
  }[];
}

export interface Current {
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
  is_day: number;
}

export interface Location {
  name: string;
  country: string;
}

export interface Weather {
  location: Location;
  current: Current;
  forecast: {
    forecastday: Forecast[];
  };
}

export interface ActionInputProps {
  placeholder: string;
  buttonLabel: string;
  handleOnClick: () => void;
  handleOnChange: (value: string) => void;
}

export interface ComponentProps {
  user: User;
  isLoggedIn: boolean;
}
