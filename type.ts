export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type MainInfo = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type Clouds = {
  all: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type Sys = {
  pod?: string;
  country?: string;
  sunrise?: number;
  sunset?: number;
};

type Coord = {
  lon: number;
  lat: number;
};

export type WeatherData = {
  weather: Weather[];
  base: string;
  main: MainInfo;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type WeatherItem = {
  dt: number;
  main: MainInfo;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
};

type City = {
  coord: Coord;
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
};

export type WeatherApiResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[];
  city: City;
};
