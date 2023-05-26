import React, {useContext} from 'react';
import GoogleMapReact from 'google-map-react';
import {ThemeContext} from '../contexts/Theme';
import googleAPIKey from '../information/googleAPIKey';

const Map = () => {
  const {theme} = useContext(ThemeContext);
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
      bootstrapURLKeys={{key: googleAPIKey}}
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
