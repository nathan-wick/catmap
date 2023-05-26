import React, {useEffect, useState} from 'react';
import Map from '../components/Map';
import Navigation from '../components/Navigation';
import {getFunctions, httpsCallable} from 'firebase/functions';
import {Facility} from '../types/Facility';

const Home = () => {
  const [facilities, setFacilities] = useState<Facility[]>();
  const functions = getFunctions();
  const retrieveFacilityData = httpsCallable(functions, 'retrieveFacilityData');

  useEffect(() => {
    retrieveFacilityData()
        .then((result) => {
          setFacilities(result.data as Facility[]);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  useEffect(() => {
    console.log(facilities);
  }, [facilities]);

  return <>
    <Navigation />
    <Map />
  </>;
};

export default Home;
