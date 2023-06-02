import React, {FC, createContext, useEffect, useState} from 'react';
import {FacilityDataDTO} from '../types/FacilityDataDTO';
import {getFunctions, httpsCallable} from 'firebase/functions';
import getFacilityLocation from '../utilities/getFacilityLocation';
import changeTimezone from '../utilities/changeTimezone';

const emptyFacilityData: FacilityDataDTO = {
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

  const getNewFacilityData = () => {
    getFacilityData()
        .then((result) => {
          const newFacilityData = result.data as FacilityDataDTO;
          const {todayFacilityData} = newFacilityData;
          const currentFacilityData =
            todayFacilityData[todayFacilityData.length - 1];
          if (currentFacilityData) {
            for (const facility of currentFacilityData) {
              const location = getFacilityLocation(facility.name);
              facility.location = location;
            }
            localStorage.setItem(
                'facilityData',
                JSON.stringify(newFacilityData),
            );
            setFacilityData(newFacilityData);
            console.log('Set New Facility Data');
          }
        })
        .catch((error) => {
          console.error(error);
        });
  };

  useEffect(() => {
    const previousFacilityDataRaw = localStorage.getItem('facilityData');
    if (previousFacilityDataRaw) {
      const previousFacilityData: FacilityDataDTO =
        JSON.parse(previousFacilityDataRaw);
      const currentHour = changeTimezone(new Date(), 'America/New_York')
          .getHours();
      if (previousFacilityData.todayFacilityData.length === currentHour) {
        setFacilityData(previousFacilityData);
        console.log('Set Previous Facility Data');
      } else {
        getNewFacilityData();
      }
    } else {
      getNewFacilityData();
    }
  }, []);

  return <FacilitiesContext.Provider value={facilityData}>
    {children}
  </FacilitiesContext.Provider>;
};

export default FacilitiesContextProvider;
