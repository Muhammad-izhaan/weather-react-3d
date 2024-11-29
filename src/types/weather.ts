export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface HourForecast {
  time: string;
  temp_c: number;
  condition: WeatherCondition;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  precip_mm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  windchill_c: number;
  heatindex_c: number;
  dewpoint_c: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  gust_kph: number;
  uv: number;
}

export interface HourlyForecastProps {
  hourlyData: HourForecast[];
}

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: WeatherCondition;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: WeatherCondition;
      };
      hour: Array<HourForecast>;
    }>;
  };
}

export interface WeatherCardProps {
  temperature: number;
  condition: string;
  location: string;
  feelsLike: number;
  humidity: number;
  visibility: number;
  precipitation: number;
  windSpeed: number;
}

export interface WeatherSceneProps {
  condition: string;
  isDay: boolean;
}

export interface DailyForecastProps {
  dailyData: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
  }>;
}
