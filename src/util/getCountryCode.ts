import fetchWithTimeout from './fetchWithTimeout'

interface GeonamesCountryCode {
  languages: string[]
  countryCode: string
  countryName: string
}

const geocode = {
  baseUrl: 'http://api.geonames.org/countryCodeJSON',
  apiKey: 'jasonpoon',
}

export default function(
  coordinates: Coordinates
): Promise<GeonamesCountryCode> {
  console.log( `Geocoding lat=${coordinates.latitude}, lng=${coordinates.longitude}.`)
  var url = `${geocode.baseUrl}?lat=${coordinates.latitude}&lng=${
    coordinates.longitude
  }&username=${geocode.apiKey}`
  return fetchWithTimeout(url)
}
