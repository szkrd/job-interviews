import * as React from 'react'
import styles from './WeatherDisplay.module.scss'

interface IProps {
  locationName: string
  temperature: number
  description: string
}

export default function WeatherDisplay(props: IProps) {
  const { locationName, temperature, description } = props
  return (
    <div className={styles.weatherDisplay}>
      <h2>{locationName}</h2>
      <ul>
        <li>{temperature}℃</li>
        <li>{description}</li>
      </ul>
    </div>
  )
}
