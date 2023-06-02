import React, {useContext} from 'react';
import {FacilitiesContext} from '../contexts/Facilities';
import {Col, Row} from 'react-bootstrap';

const Map = () => {
  const {todayFacilityData} = useContext(FacilitiesContext);
  const currentFacilityData = todayFacilityData[todayFacilityData.length - 1];

  return <Row>
    {
      currentFacilityData && currentFacilityData
          .filter((facility) =>
            facility.location?.latitude && facility.location?.longitude)
          .map((facility, index) => <Col
            key={index}
            lg={4}
            md={6}
            sm={12}>
            <div
              className='m-4 p-2 rounded shadow text-center'>
              <h1>{facility.name}</h1>
            </div>
          </Col>)
    }
  </Row>;
};

export default Map;
