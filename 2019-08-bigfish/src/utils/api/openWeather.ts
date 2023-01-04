import api from './api'

interface IGeographicCoordinate {
  latitude: number
  longitude: number
}

interface IWeather {
  id: number
  main: string
  description: string
  icon: string
}

interface IMain {
  temp: number
  pressure: number
  humidity: number
  temp_min: number
  temp_max: number
}

export interface IWeatherResponse {
  name: string
  weather: IWeather[]
  main: IMain
}

const weather = {
  /**
   * @returns AxiosResponse<IWeatherResponse> (yieldable)
   */
  byGeographicCoordinates: (coords: IGeographicCoordinate) => {
    return api.get('weather', {
      lat: coords.latitude,
      lon: coords.longitude
    })
  }
}

// probably openWeather should mirror the structure of the Open Weather API...
const openWeather = {
  weather
  // group
  // city
  // etc
}

export default openWeather
