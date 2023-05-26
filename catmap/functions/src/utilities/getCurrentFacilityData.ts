import {Facility} from "../types/Facility";
import {RawFacility} from "../types/RawFacility";
import {RawOccupancy} from "../types/RawOccupancy";

const getCurrentFacilityData = async () => {
  const apiUrl = "https://cso.uc.edu:3000/occupancy";
  const rawData = await fetch(apiUrl);
  const jsonData = await rawData.json();

  const currentFacilityData: Facility[] =
    jsonData.map((rawFacility: RawFacility) => {
      const capacity = rawFacility.Occupancy.reduce(
        (totalCapacity: number, rawOccupancy: RawOccupancy) =>
          totalCapacity + parseInt(rawOccupancy.Capacity),
        0,
      );
      let available = rawFacility.Occupancy.reduce(
        (totalAvailable: number, rawOccupancy: RawOccupancy) =>
          totalAvailable + parseInt(rawOccupancy.Available),
        0,
      );

      if (available > capacity) {
        available = capacity;
      }

      if (available < 0) {
        available = 0;
      }

      const newFacility: Facility = {
        name: rawFacility.Description,
        occupancy: {
          capacity,
          available,
        },
      };

      return newFacility;
    });

  return currentFacilityData;
};

export default getCurrentFacilityData;
