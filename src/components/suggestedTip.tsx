import * as React from 'react'

interface SuggestedTipProps {
  countryCode: string
}

interface CountryToTipMap {
  name: string
  countryCode: string
  tip: {
    restaurant: number,
    default: number
  }
}

export default class extends React.Component<SuggestedTipProps, any> {
  countryCodeMap: CountryToTipMap[] = require('../../data/countryCodeMap.json')

  constructor(props: SuggestedTipProps) {
    super(props);
    this.state = { tip: "" };
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

    this.setState({ countryName: country.name, tip: country.tip })
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
    var rows : JSX.Element[] = []
    Object.keys(this.state.tip).forEach(key => {
      if (key != 'default') {
        rows.push(<tr key={key}><td>{key}</td><td>{this.state.tip[key]}%</td></tr>);
      }
    })

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        <p>
          In <b>{this.state.countryName}</b>, the suggested tip amount is{' '}
          <b>{this.state.tip.default}%</b>. Other guidelines:
        </p>

        <table style={{
          width: '50vh',
        }}>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}
