import * as React from 'react'
import Link from 'gatsby-link'
import SuggestedTip from '../components/suggestedTip/suggestedTip'
import getCountryCode from '../util/getCountryCode'
let qs = require('qs')

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
  location: {
    search: string
  }
}

export default class extends React.Component<IndexPageProps, any> {
  defaultPositionOptions: PositionOptions = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0,
  }

  constructor(props: IndexPageProps) {
    super(props)
    this.state = { isLoaded: false }
  }

  _getCurrentPosition(
    options: PositionOptions = this.defaultPositionOptions
  ): Promise<Coordinates> {
    console.log(`Retrieving current geolocation.`)
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

  componentDidMount() {
    let countryCode = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).countryCode
    if (countryCode) {
      this.setState({ isLoaded: true, countryCode: countryCode })
      return
    }

    this._getCurrentPosition()
      .then(position => getCountryCode(position))
      .then(location => {
        this.setState({ isLoaded: true, countryCode: location.countryCode })
      })
      .catch(err => {
        let errMsg = 'Unable to retrieve current location.'
        if (err instanceof Error) {
          let error = err as Error
          errMsg += ` ${error.message}`
        }

        console.error(errMsg)
        this.setState({
          isLoaded: true,
          error: errMsg,
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
