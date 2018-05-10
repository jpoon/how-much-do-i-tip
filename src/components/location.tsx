import * as React from 'react'

interface LocationState {
  loaded: boolean,
  coordinates: Coordinates,
  countryCode: string,
  error: string,
}

const geocode = {
  baseUrl: "http://ws.geonames.org/countryCodeJSON",
  apiKey: "jasonpoon"
}
const defaultPositionOptions: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 0
};

export default class extends React.Component<any, any> {
  constructor(props: any){
    super(props);

    this.state = {
      loaded: false,
    }
  }

  _getCoordinates(options: PositionOptions = defaultPositionOptions) : Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator || !navigator.geolocation) {
        reject(new Error('Not Supported'));
      }
      
      navigator.geolocation.getCurrentPosition(
        (pos) => { resolve(pos.coords); }, 
        () => { reject (new Error('Permission denied')); },
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
      .then(coords => {
        this.setState({
          coordinates: coords
        })
        return this._getCountryCode(coords)
      })
      .then(location => {
        this.setState({
          loaded: true,
          countryCode: location.countryCode
        })
      })
      .catch(err => {
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
        <div>Latitude: <span>{this.state.coordinates.latitude}</span></div>
        <div>Longitude: <span>{this.state.coordinates.longitude}</span></div>
        <div>CountryCode: <span>{this.state.countryCode}</span></div>
      </div>
    );
  }
}

