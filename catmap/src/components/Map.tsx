import React, {useContext} from 'react';
import GoogleMapReact from 'google-map-react';
import {ThemeContext} from '../contexts/Theme';

const Map = () => {
  const {theme} = useContext(ThemeContext);
  // TODO: Update Security Rules: https://console.cloud.google.com/apis/credentials/key/644506b1-6086-4a19-acf4-b8c80db2f6af?project=nathan-wick-catmap
  const GoogleMapsAPIKey = '';
  const defaultProps = {
    center: {
      lat: 39.132906,
      lng: -84.514949,
    },
    zoom: 16,
  };

  return <div
    style={{height: '80vh', width: '100vw'}}>
    <GoogleMapReact
      key={theme}
      bootstrapURLKeys={{key: GoogleMapsAPIKey}}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      options={{
        mapId: theme === 'light' ? '64e83980abf9f725' : '5b0d3e8becae82a8',
      }}
      yesIWantToUseGoogleMapApiInternals>
    </GoogleMapReact>
  </div>;
};

export default Map;
