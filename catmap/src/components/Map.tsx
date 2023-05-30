import React, {useContext} from 'react';
import {ThemeContext} from '../contexts/Theme';
import googleAPIKey from '../information/googleAPIKey';
import {FacilitiesContext} from '../contexts/Facilities';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const Map = () => {
  const {theme} = useContext(ThemeContext);
  const {currentFacilityData} = useContext(FacilitiesContext);
  const defaultProps = {
    style: {
      height: '80vh',
      width: '100vw',
    },
    center: {
      lat: 39.132906,
      lng: -84.514949,
    },
    zoom: 16,
  };

  return <LoadScript
    googleMapsApiKey={googleAPIKey}>
    <GoogleMap
      mapContainerStyle={defaultProps.style}
      center={defaultProps.center}
      zoom={defaultProps.zoom}
      options={{
        mapId: theme === 'light' ? '64e83980abf9f725' : '5b0d3e8becae82a8',
      }}>
      {
        currentFacilityData.map((facility, index) => <Marker
          key={index}
          icon={`http://maps.google.com/mapfiles/ms/icons/${
            facility.occupancy.available < facility.occupancy.capacity / 4 ?
              'red' :
              facility.occupancy.available < facility.occupancy.capacity / 2 ?
                'yellow' :
                'green'
          }-dot.png`}
          position={{
            lat: facility.location?.latitude ?? 0,
            lng: facility.location?.longitude ?? 0,
          }} />)
      }
    </GoogleMap>
  </LoadScript>;
};

export default Map;
