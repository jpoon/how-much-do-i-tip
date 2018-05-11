import * as React from 'react'
import Location from './location'

export default class extends React.Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = { };
  }

  _getTipForCountryCode(countryCode: string) {
    return fetch('../data/countryCodes.json')
      .then(res => res.json())
      .then((data) => {
        console.log('data:', data);
      })
  }

  onLocationUpdated(countryCode?: string, err?: string) {
    console.log(countryCode)
    this.setState({ countryCode: countryCode, error: err })
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Location onLocationUpdate={this.onLocationUpdated.bind(this)} />
        Hello {this.state.countryCode}
      </div>
    );
  }
}

