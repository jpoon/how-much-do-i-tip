import * as React from 'react'

interface SuggestedTipProps {
  countryCode: string
}

interface CountryToTipMap {
  name: string
  countryCode: string
  tip: {
    restaurant: string
    default: string
  }
}

export default class extends React.Component<SuggestedTipProps, any> {
  countryCodeMap: CountryToTipMap[] = require('../../data/countryCodeMap.json')

  constructor(props: SuggestedTipProps) {
    super(props)
    this.state = { tip: '' }
  }

  _getTipForCountryCode(countryCode: string) {
    let country = this.countryCodeMap.find(
      (c: CountryToTipMap) => c.countryCode === countryCode
    )

    if (!country) {
      let errorMsg = `Unable to find country with country code: ${countryCode}`
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
    this._getTipForCountryCode(this.props.countryCode.toUpperCase())
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>
    }

    var rows: JSX.Element[] = []
    Object.keys(this.state.tip).forEach(key => {
      if (key != 'default') {
        rows.push(
          <div className="tr" key={key}>
            <div className="td">{key}</div>
            <div className="td">{this.state.tip[key]}</div>
          </div>
        )
      }
    })

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <p>
          In <b>{this.state.countryName}</b>, tipping is generally{' '}
          <b>{this.state.tip.default}</b>.
        </p>

        {rows.length > 0 &&
          <div className="table" style={{
            width: '100%'
          }}>
            <div className="tr th">
              <div className="td">Other Guidelines:</div>
              <div className="td"></div>
            </div>
            {rows}
          </div>
        }
      </div>
    )
  }
}
