import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../contexts/Theme';
import googleAPIKey from '../information/googleAPIKey';
import {FacilitiesContext} from '../contexts/Facilities';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import {Facility} from '../types/Facility';
import {InformationWindow} from '../types/InformationWindow';

const Map = () => {
  const {theme} = useContext(ThemeContext);
  const {currentFacilityData} = useContext(FacilitiesContext);
  const [informationWindows, setInformationWindows] =
    useState<InformationWindow[]>([]);

  const onMarkerClick = (facility: Facility, open: boolean) => {
    const newInformationWindows: InformationWindow[] =
      structuredClone(informationWindows);
    const thisInformationWindow =
      newInformationWindows.find((informationWindow: InformationWindow) =>
        informationWindow.name === facility.name);
    if (thisInformationWindow) {
      thisInformationWindow.isOpen = open;
      setInformationWindows(newInformationWindows);
    }
  };

  useEffect(() => {
    setInformationWindows(currentFacilityData.map((facility) => ({
      name: facility.name,
      isOpen: false,
    })));
  }, [currentFacilityData]);

  return <LoadScript
    googleMapsApiKey={googleAPIKey}>
    <GoogleMap
      mapContainerStyle={{
        height: '80vh',
        width: '100vw',
      }}
      center={{
        lat: 39.132906,
        lng: -84.514949,
      }}
      zoom={16}
      options={{
        mapId: theme === 'light' ? '64e83980abf9f725' : '5b0d3e8becae82a8',
      }}>
      {
        currentFacilityData.filter((facility) => facility.location)
            .map((facility, index) => <Marker
              key={index}
              onClick={() => onMarkerClick(facility, true)}
              animation={google.maps.Animation.DROP}
              icon={`http://maps.google.com/mapfiles/ms/icons/${ // TODO Replace with custom icons
                facility.occupancy.available < facility.occupancy.capacity / 4 ?
                  'red' :
                  facility.occupancy.available <
                    facility.occupancy.capacity / 2 ?
                      'yellow' :
                      'green'
              }-dot.png`}
              position={{
                lat: facility.location?.latitude ?? 0,
                lng: facility.location?.longitude ?? 0,
              }}>
              {
                informationWindows.find(
                    (informationWindow: InformationWindow) =>
                      informationWindow.name === facility.name)?.isOpen &&
                  (<InfoWindow
                    onCloseClick={() => onMarkerClick(facility, false)}>
                    <>
                      <h4>{facility.name}</h4>
                      <p>{`${facility.occupancy.available} spots available`}</p>
                    </>
                  </InfoWindow>)
              }
            </Marker>)
      }
    </GoogleMap>
  </LoadScript>;
};

export default Map;
