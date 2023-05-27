import React, {useContext} from 'react';
import GoogleMapReact from 'google-map-react';
import {ThemeContext} from '../contexts/Theme';
import googleAPIKey from '../information/googleAPIKey';
import {FacilitiesContext} from '../contexts/Facilities';
import {MarkerProps} from '../types/MarkerProps';

const Marker: React.FC<MarkerProps> = ({name}) => <div>
  {name}
</div>;

const Map = () => {
  const {theme} = useContext(ThemeContext);
  const {currentFacilityData} = useContext(FacilitiesContext);
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
      {
        currentFacilityData.map((facility) => <Marker
          key={facility.name}
          name={facility.name}
          lat={facility.location?.latitude}
          lng={facility.location?.longitude} />)
      }
    </GoogleMapReact>
  </div>;
};

export default Map;
