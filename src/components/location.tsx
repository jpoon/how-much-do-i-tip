import * as React from 'react'

const geocode = {
  baseUrl: "http://ws.geonames.org/countryCodeJSON",
  apiKey: "jasonpoon"
}
const defaultPositionOptions: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 0
};

interface LocationProps {
  onLocationUpdate: (countryCode?: string, err?: string) => void;
}

export default class extends React.Component<LocationProps, any> {
  constructor(props: any){
    super(props);

    this.state = { loaded: false }
  }

  _getCoordinates(options: PositionOptions = defaultPositionOptions) : Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator || !navigator.geolocation) {
        reject(new Error('Geolocation: Not Supported'));
      }
      
      navigator.geolocation.getCurrentPosition(
        (pos) => { resolve(pos.coords); }, 
        () => { reject(new Error('Geolocation: Permission denied')); },
        options
      );
    });
  };

  _getCountryCode(coordinates: Coordinates) {
    var url = `${geocode.baseUrl}?lat=${coordinates.latitude}&lng=${coordinates.longitude}&username=${geocode.apiKey}`
    return fetch(url)
      .then(response => {
        if (response.status >= 400) {
          throw new Error(`Bad response (${response.status}) from ${geocode.baseUrl}`);
        }
        return response.json();
      })
  }

  componentDidMount() {
    this._getCoordinates()
      .then(coords => this._getCountryCode(coords))
      .then(location => location.countryCode)
      .then(countryCode => {
        this.props.onLocationUpdate(countryCode)
        this.setState({
          loaded: true,
          countryCode: countryCode
        })
      })
      .catch(err => {
        this.props.onLocationUpdate(null, err)
        this.setState({
          loaded: true,
          error: err
        })
      });
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div>CountryCode: <span>{this.state.countryCode}</span></div>
        <div>Error: <span>{this.state.error}</span></div>
      </div>
    );
  }
}

