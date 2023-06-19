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
// @ts-ignore
import markerGreen from '../images/marker-green.svg';
// @ts-ignore
import markerYellow from '../images/marker-yellow.svg';
// @ts-ignore
import markerRed from '../images/marker-red.svg';
import {Button, Col, Row} from 'react-bootstrap';
import {BarChart, Signpost} from 'react-bootstrap-icons';

const Map = () => {
  const {theme} = useContext(ThemeContext);
  const {todayFacilityData} = useContext(FacilitiesContext);
  const currentFacilityData = todayFacilityData[todayFacilityData.length - 1];
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
    if (currentFacilityData) {
      setInformationWindows(currentFacilityData.map((facility) => ({
        name: facility.name,
        isOpen: false,
      })));
    }
  }, [currentFacilityData]);

  return <LoadScript
    googleMapsApiKey={googleAPIKey}>
    <GoogleMap
      mapContainerStyle={{
        height: '74vh',
        width: '100vw',
      }}
      center={{
        lat: 39.132906,
        lng: -84.514949,
      }}
      zoom={16}
      options={{
        mapId: theme === 'light' ? '64e83980abf9f725' : '5b0d3e8becae82a8',
        disableDefaultUI: true,
      }}>
      {
        currentFacilityData && currentFacilityData
            .filter((facility) =>
              facility.location?.latitude && facility.location?.longitude)
            .map((facility, index) => <Marker
              key={index}
              onClick={() => onMarkerClick(facility, true)}
              icon={facility.occupancy.available <
                facility.occupancy.capacity / 4 ?
                markerRed :
                facility.occupancy.available < facility.occupancy.capacity / 2 ?
                  markerYellow :
                  markerGreen}
              position={{
                lat: facility.location?.latitude ?? 0,
                lng: facility.location?.longitude ?? 0,
              }}
              animation={google.maps.Animation.DROP}>
              {
                informationWindows.find(
                    (informationWindow: InformationWindow) =>
                      informationWindow.name === facility.name)?.isOpen &&
                  (<InfoWindow
                    onCloseClick={() => onMarkerClick(facility, false)}>
                    <div
                      className='text-dark text-center'
                      style={{width: '240px'}}>
                      <h4>{facility.name}</h4>
                      <Row
                        className='gx-0'>
                        <Col
                          md={6}
                          sm={12}
                          className='p-2'>
                          <Button
                            variant={facility.occupancy.available <
                              facility.occupancy.capacity / 4 ?
                                'danger' :
                                facility.occupancy.available <
                                facility.occupancy.capacity / 2 ?
                                  'warning' :
                                  'success'}
                            className='w-100 text-light'
                            onClick={() =>
                              location.href = `#${facility.name}`}>
                            <BarChart
                              className='mx-2' />
                            Occupancy
                          </Button>
                        </Col>
                        <Col
                          md={6}
                          sm={12}
                          className='p-2'>
                          <Button
                            variant={facility.occupancy.available <
                              facility.occupancy.capacity / 4 ?
                                'danger' :
                                facility.occupancy.available <
                                facility.occupancy.capacity / 2 ?
                                  'warning' :
                                  'success'}
                            className='w-100 text-light'
                            onClick={() =>
                              window.open(`https://www.google.com/maps/@${facility.location?.latitude},${facility.location?.longitude},20z`)}>
                            <Signpost
                              className='mx-2' />
                            Directions
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </InfoWindow>)
              }
            </Marker>)
      }
    </GoogleMap>
  </LoadScript>;
};

export default Map;
