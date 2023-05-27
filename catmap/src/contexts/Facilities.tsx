import React, {FC, createContext, useEffect, useState} from 'react';
import {FacilityDataDTO} from '../types/FacilityDataDTO';
import {getFunctions, httpsCallable} from 'firebase/functions';
import getFacilityLocation from '../utilities/getFacilityLocation';

const emptyFacilityData: FacilityDataDTO = {
  currentFacilityData: [],
  todayFacilityData: [],
  lastWeekFacilityData: [],
};

export const FacilitiesContext =
  createContext<FacilityDataDTO>(emptyFacilityData);

export const FacilitiesContextProvider: FC<{
    children: JSX.Element
}> = ({children}) => {
  const [facilityData, setFacilityData] =
    useState<FacilityDataDTO>(emptyFacilityData);
  const functions = getFunctions();
  const getFacilityData = httpsCallable(functions, 'getFacilityData');

  useEffect(() => {
    getFacilityData()
        .then((result) => {
          const newFacilityData = result.data as FacilityDataDTO;
          for (const facility of newFacilityData.currentFacilityData) {
            const location = getFacilityLocation(facility.name);
            facility.location = location;
          }
          setFacilityData(newFacilityData);
          console.log(newFacilityData);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  return <FacilitiesContext.Provider value={facilityData}>
    {children}
  </FacilitiesContext.Provider>;
};

export default FacilitiesContextProvider;
