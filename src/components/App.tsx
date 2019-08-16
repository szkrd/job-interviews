import React, { useEffect, useState } from 'react'
import styles from './App.module.scss'
import co from 'co'
import geoLocation, {
  GeoLocationUnavailableError,
  PositionError,
  PositionErrorCode
} from '../utils/browser/geoLocation'
import ErrorMessage from './ErrorMessage/ErrorMessage'
import Loader from './Loader/Loader'
import openWeather, { IWeatherResponse } from '../utils/api/openWeather'
import { AxiosResponse } from 'axios'
import WeatherDisplay from './WeatherDisplay/WeatherDisplay'

class WeatherData {
  locationName = ''
  temperature = 0
  description = ''
  iconId = ''
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [geoUnavailable, setGeoUnavailable] = useState<boolean>(false)
  const [geoError, setGeoError] = useState<PositionErrorCode>(PositionErrorCode.None)
  const [unknownError, setUnknownError] = useState<boolean>(false)
  const [weatherData, setWeatherData] = useState<WeatherData>(new WeatherData())

  useEffect(() => {
    co(function*() {
      const position: Position = yield geoLocation.getCurrentPosition()
      const result: AxiosResponse<
        IWeatherResponse
      > = yield openWeather.weather.byGeographicCoordinates(position.coords)
      const data = result.data
      const weatherItem = data.weather[0] || {}
      setWeatherData({
        locationName: data.name,
        temperature: data.main.temp,
        description: weatherItem.description || '',
        iconId: weatherItem.icon || ''
      })
      setIsLoading(false)
    }).catch((error) => {
      if (error instanceof GeoLocationUnavailableError) {
        setGeoUnavailable(true)
      } else if (error instanceof PositionError) {
        setGeoError(error.code)
      } else {
        setUnknownError(true)
        console.error(error)
      }
    })
  }, [])

  if (geoUnavailable) {
    return (
      <div className="app">
        <ErrorMessage>
          Unfortunately the Geo Location API is not available in your browser.
        </ErrorMessage>
      </div>
    )
  }

  if (geoError === PositionErrorCode.PermissionDenied || geoError === PositionErrorCode.Timeout) {
    return (
      <div className="app">
        <ErrorMessage>Please let the app access the Geo Location API in your browser!</ErrorMessage>
      </div>
    )
  }

  if (geoError > 0) {
    return (
      <div className="app">
        <ErrorMessage>
          There has been an error accessing the Geo Location API in your browser, sorry.
        </ErrorMessage>
      </div>
    )
  }

  if (unknownError) {
    return (
      <div className="app">
        <ErrorMessage>
          An unknown error happened: the remote host may be unavailable or the requests may have
          exceeded the allowed limit; please try again later.
        </ErrorMessage>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      {isLoading && <Loader />}
      {!isLoading && <WeatherDisplay {...weatherData} />}
    </div>
  )
}

export default App
