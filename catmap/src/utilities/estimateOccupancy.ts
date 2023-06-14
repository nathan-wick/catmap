import {Facility} from '../types/Facility';
import {FacilityDataDTO} from '../types/FacilityDataDTO';

const estimateFacilityData = (
    {todayFacilityData, lastWeekFacilityData}: FacilityDataDTO,
) => {
  const estimatedFacilityData: Facility[][] = [];
  for (let i = 0; i < lastWeekFacilityData.length; i++) {
    const hour = lastWeekFacilityData[i];
    const estimatedFacilities: Facility[] = [];
    for (let j = 0; j < hour.length; j++) {
      const isFirstHour = i < 1;
      const lastHourActualAvailable =
        isFirstHour || i > todayFacilityData.length - 1 ?
          hour[j].occupancy.available :
          todayFacilityData[i - 1][j].occupancy.available;
      const lastHourEstimatedAvailable = isFirstHour ?
        hour[j].occupancy.available :
        estimatedFacilityData[i - 1][j].occupancy.available;
      const lastHourDifference =
        lastHourActualAvailable / lastHourEstimatedAvailable;
      const estimatedAvailable =
        Math.round(hour[j].occupancy.available * lastHourDifference);
      const estimatedFacility: Facility = {
        name: hour[j].name,
        occupancy: {
          capacity: hour[j].occupancy.capacity,
          available: estimatedAvailable,
        },
      };
      estimatedFacilities.push(estimatedFacility);
    }
    estimatedFacilityData.push(estimatedFacilities);
  }
  return estimatedFacilityData;
};

export default estimateFacilityData;
