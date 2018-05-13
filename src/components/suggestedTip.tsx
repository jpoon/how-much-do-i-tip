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

  componentDidMount() {
    let country = this.countryCodeMap.find(
      (c: any) => c.countryCode === this.props.countryCode
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

  render() {
    return (
      <div>
        <span>
          In {this.state.countryName}, the suggested tip amount is{' '}
          {this.state.tip}.
        </span>
      </div>
    )
  }
}
