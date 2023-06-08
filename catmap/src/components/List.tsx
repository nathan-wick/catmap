import React, {useContext} from 'react';
import {FacilitiesContext} from '../contexts/Facilities';
import {Col, Row} from 'react-bootstrap';
import Chart from './Chart';

const List = () => {
  const {todayFacilityData} = useContext(FacilitiesContext);
  const currentFacilityData = todayFacilityData[todayFacilityData.length - 1];

  return <Row
    className='gx-0 text-center'>
    {
      currentFacilityData ?
        currentFacilityData
            .filter((facility) =>
              facility.location?.latitude && facility.location?.longitude)
            .sort((a, b) => {
              return b.occupancy.available - a.occupancy.available;
            })
            .map((facility, index) => <Col
              key={index}
              lg={4}
              md={6}
              sm={12}>
              <div
                className='m-4 p-2 rounded shadow'>
                <h1>{facility.name}</h1>
                <p>
                  <span
                    className='fw-bold'>
                    {facility.occupancy.available}
                  </span> Available Spots
                </p>
                <Chart
                  thisFacilityData={facility} />
              </div>
            </Col>) :
        <div
          className='p-5'>
          <h1
            className='m-5'>
            Loading...
          </h1>
        </div>
    }
  </Row>;
};

export default List;
