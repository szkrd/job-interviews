import * as queryString from 'querystring'
import axios from 'axios'
import { ParsedUrlQueryInput } from 'querystring'

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY
const API_URL = process.env.REACT_APP_OPEN_WEATHER_API_URL

if (!API_KEY || !API_URL) {
  throw new Error(`API_KEY or API_URL not set.`)
}

let apiUrl = /^https?:\/\//.test(API_URL) ? API_URL : `https://${API_URL}`
apiUrl = apiUrl.replace(/\/$/, '')

type TApiSections = 'weather' | 'find' | 'forecast' | 'box' | 'group' // etc.

const get = (apiSection: TApiSections, params: ParsedUrlQueryInput = {}) => {
  const queryParam = queryString.stringify({ ...params, units: 'metric', APPID: API_KEY })
  return axios.get(`${apiUrl}/${apiSection}?${queryParam}`)
}

const api = { get }

export default api
