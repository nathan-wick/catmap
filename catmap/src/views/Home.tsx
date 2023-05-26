import React, {useEffect, useState} from 'react';
import Map from '../components/Map';
import Navigation from '../components/Navigation';
import {getFunctions, httpsCallable} from 'firebase/functions';
import {Facility} from '../types/Facility';
import {FacilityDataDTO} from '../types/FacilityDataDTO';

const Home = () => {
  const [facilities, setFacilities] = useState<Facility[]>();
  const functions = getFunctions();
  const getFacilityData = httpsCallable(functions, 'getFacilityData');

  useEffect(() => {
    getFacilityData()
        .then((result) => {
          const facilityData = result.data as FacilityDataDTO;
          setFacilities(facilityData.currentFacilityData);
          console.log(facilityData);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  console.log('TODO: Move Facility Data to a Context', facilities);

  return <>
    <Navigation />
    <Map />
  </>;
};

export default Home;
