import * as React from 'react'
import Link from 'gatsby-link'
import SuggestedTip from '../components/suggestedTip'
import fetchWithTimeout from '../util/fetchWithTimeout'

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

export default class extends React.Component<IndexPageProps, any> {
  defaultPositionOptions: PositionOptions = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0,
  }
  geocode = {
    baseUrl: 'http://ws.geonames.org/countryCodeJSON',
    apiKey: 'jasonpoon',
  }

  constructor(props: IndexPageProps) {
    super(props)
    this.state = { isLoaded: false }
  }

  _getCurrentPosition(
    options: PositionOptions = this.defaultPositionOptions
  ): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator || !navigator.geolocation) {
        reject(new Error('Geolocation: Not Supported'))
      }

      navigator.geolocation.getCurrentPosition(
        pos => resolve(pos.coords),
        () => reject(new Error('Geolocation: Permission denied')),
        options
      )
    })
  }

  _getCountryCode(coordinates: Coordinates) {
    var url = `${this.geocode.baseUrl}?lat=${coordinates.latitude}&lng=${
      coordinates.longitude
    }&username=${this.geocode.apiKey}`
    return fetchWithTimeout(url)
  }

  componentDidMount() {
    this._getCurrentPosition()
      .then(position => this._getCountryCode(position))
      .then(location => location.countryCode)
      .then(countryCode =>
        this.setState({ isLoaded: true, countryCode: countryCode })
      )
      .catch(err => {
        console.error(err)
        this.setState({
          isLoaded: true,
          error: 'Unable to retrieve current location.',
        })
      })
  }

  public render() {
    if (!this.state.isLoaded) {
      return <p>Grabbing your location and local tip etiquette...</p>
    }
    if (this.state.error) {
      return <p>{this.state.error}</p>
    }

    return <SuggestedTip countryCode={this.state.countryCode} />
  }
}
