import * as React from 'react'

interface SuggestedTipProps {
  countryCode: string
}

export default class extends React.Component<SuggestedTipProps, any> {
  countryCodeMap = require('../../data/countryCodeMap.json')

  constructor(props: SuggestedTipProps) {
    super(props)
    this.state = {}
  }

  _getTipForCountryCode(countryCode: string) {
    let country = this.countryCodeMap.find(
      (c: any) => c.countryCode === countryCode
    )

    if (!country) {
      this.setState({
        error: `SuggestedTip: Unable to find country with country code: ${
          this.state.countryCode
        }`,
      })
      return
    }

    this.setState({ countryName: country.name, tip: country.tip.percentage })
  }

  componentWillReceiveProps(nextProps: SuggestedTipProps) {
    if (this.props.countryCode != nextProps.countryCode) {
      this._getTipForCountryCode(nextProps.countryCode);
    }
  }

  componentDidMount() {
    this._getTipForCountryCode(this.props.countryCode);
  }

  render() {
    return (
      <div>
        <span>
          In <b>{this.state.countryName}</b>, the suggested tip amount is <b>{this.state.tip}%</b>.
        </span>
      </div>
    )
  }
}
