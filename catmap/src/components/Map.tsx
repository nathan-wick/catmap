import React from 'react';
import GoogleMapReact from 'google-map-react';

const Map = () => {
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
      bootstrapURLKeys={{key: GoogleMapsAPIKey}}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      yesIWantToUseGoogleMapApiInternals>
    </GoogleMapReact>
  </div>;
};

export default Map;
