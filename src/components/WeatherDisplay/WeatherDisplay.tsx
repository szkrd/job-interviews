import * as React from 'react'
import styles from './WeatherDisplay.module.scss'

interface IProps {
  locationName: string
  temperature: number
  description: string
  iconId: string
}

export default function WeatherDisplay(props: IProps) {
  const { locationName, temperature, description, iconId } = props
  const iconUrl = `http://openweathermap.org/img/w/${iconId}.png`
  return (
    <div className={styles.weatherDisplay}>
      <h2>{locationName}</h2>
      <ul>
        <li>{Math.round(temperature)} ℃</li>
        <li>{description}</li>
        <li>
          <img src={iconUrl} alt={description} className="icon" />
        </li>
      </ul>
    </div>
  )
}
