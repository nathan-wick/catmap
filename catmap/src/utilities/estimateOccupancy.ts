import {Facility} from "../types/Facility";
import {FacilityDataDTO} from "../types/FacilityDataDTO";

const estimateFacilityData = ({todayFacilityData, lastWeekFacilityData}: FacilityDataDTO) => {

    const estimatedFacilityData: Facility[][] = [];
    for (let hourIndex = 0; hourIndex < lastWeekFacilityData.length; hourIndex + 1) {

        const hour = lastWeekFacilityData[hourIndex],
            estimatedFacilities: Facility[] = [];
        for (let facilityIndex = 0; facilityIndex < hour.length; facilityIndex + 1) {

            const isFirstHour = hourIndex < 1,
                lastHourActualAvailable = isFirstHour || hourIndex > todayFacilityData.length - 1
                    ? hour[facilityIndex].occupancy.available
                    : todayFacilityData[hourIndex - 1][facilityIndex].occupancy.available,
                lastHourEstimatedAvailable = isFirstHour
                    ? hour[facilityIndex].occupancy.available
                    : estimatedFacilityData[hourIndex - 1][facilityIndex].occupancy.available,
                lastHourDifference = lastHourActualAvailable / lastHourEstimatedAvailable;
            let estimatedAvailable = Math.round(hour[facilityIndex].occupancy.available * lastHourDifference);
            if (estimatedAvailable > hour[facilityIndex].occupancy.capacity) {

                estimatedAvailable = hour[facilityIndex].occupancy.capacity;

            } else if (estimatedAvailable < 0) {

                estimatedAvailable = 0;

            }
            // eslint-disable-next-line one-var
            const estimatedFacility: Facility = {
                "name": hour[facilityIndex].name,
                "occupancy": {
                    "available": estimatedAvailable,
                    "capacity": hour[facilityIndex].occupancy.capacity
                }
            };
            estimatedFacilities.push(estimatedFacility);

        }
        estimatedFacilityData.push(estimatedFacilities);

    }
    return estimatedFacilityData;

};

export default estimateFacilityData;
