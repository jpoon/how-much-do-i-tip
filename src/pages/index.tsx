import * as React from 'react'
import Link from 'gatsby-link'
import SuggestedTip from '../components/suggestedTip'

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
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
    this.state = {}
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
    return fetch(url).then(response => response.json())
  }

  componentDidMount() {
    this._getCurrentPosition()
      .then(position => this._getCountryCode(position))
      .then(location => location.countryCode)
      .then(countryCode => this.setState({ countryCode: countryCode }))
      .catch(err => {
        this.setState({ error: err })
      })
  }

  public render() {
    if (this.state.error) {
      return <div />
    }

    if (!this.state.countryCode) {
      return <div />
    }

    return (
      <div
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          border: '1px solid orange',
        }}
      >
        <SuggestedTip countryCode={this.state.countryCode} />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
