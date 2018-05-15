import * as React from 'react'

interface SuggestedTipProps {
  countryCode: string
}

interface CountryToTipMap {
  name: string
  countryCode: string
  tip: {
    restaurant: number
  }
}

export default class extends React.Component<SuggestedTipProps, any> {
  countryCodeMap: CountryToTipMap[] = require('../../data/countryCodeMap.json')

  constructor(props: SuggestedTipProps) {
    super(props)
    this.state = {}
  }

  _getTipForCountryCode(countryCode: string) {
    let country = this.countryCodeMap.find(
      (c: CountryToTipMap) => c.countryCode === countryCode
    )

    if (!country) {
      let errorMsg = `SuggestedTip: Unable to find country with country code: ${countryCode}`
      console.error(errorMsg)
      this.setState({ error: errorMsg })
      return
    }

    this.setState({ countryName: country.name, tip: country.tip.restaurant })
  }

  componentWillReceiveProps(nextProps: SuggestedTipProps) {
    if (this.props.countryCode != nextProps.countryCode) {
      this._getTipForCountryCode(nextProps.countryCode)
    }
  }

  componentDidMount() {
    this._getTipForCountryCode(this.props.countryCode)
  }

  render() {
    return (
      <div>
        <span>
          In <b>{this.state.countryName}</b>, the suggested tip amount is{' '}
          <b>{this.state.tip}%</b>.
        </span>
      </div>
    )
  }
}
