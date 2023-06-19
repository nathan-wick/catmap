import {Facility} from "../types/Facility";
import {RawFacility} from "../types/RawFacility";
import {RawOccupancy} from "../types/RawOccupancy";

const getCurrentFacilityData = async () => {

    const apiUrl = "https://cso.uc.edu:3000/occupancy",
        rawData = await fetch(apiUrl),
        jsonData = await rawData.json(),

        currentFacilityData: Facility[] =
    jsonData.map((rawFacility: RawFacility) => {

        const capacity = rawFacility.Occupancy.reduce(
            (totalCapacity: number, rawOccupancy: RawOccupancy) =>
                totalCapacity + parseInt(
                    rawOccupancy.Capacity,
                    10
                ),
            0
        );
        let available = rawFacility.Occupancy.reduce(
            (totalAvailable: number, rawOccupancy: RawOccupancy) =>
                totalAvailable + parseInt(
                    rawOccupancy.Available,
                    10
                ),
            0
        );

        if (available > capacity) {

            available = capacity;

        }

        if (available < 0) {

            available = 0;

        }

        // eslint-disable-next-line one-var
        const newFacility: Facility = {
            "name": rawFacility.Description,
            "occupancy": {
                available,
                capacity
            }
        };

        return newFacility;

    });

    return currentFacilityData;

};

export default getCurrentFacilityData;
