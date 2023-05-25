import {onCall} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {Facility} from "./types/Facility";
import {RawFacility} from "./types/RawFacility";
import {RawOccupancy} from "./types/RawOccupancy";

initializeApp();

exports.retrieveFacilityData = onCall(async () => {
  const apiUrl = "https://cso.uc.edu:3000/occupancy";
  const rawData = await fetch(apiUrl);
  const jsonData = await rawData.json();

  const occupancyData: Facility[] = jsonData.map((rawFacility: RawFacility) => {
    const capacity = rawFacility.Occupancy.reduce(
      (totalCapacity: number, rawOccupancy: RawOccupancy) =>
        totalCapacity + parseInt(rawOccupancy.Capacity),
      0,
    );
    const available = rawFacility.Occupancy.reduce(
      (totalAvailable: number, rawOccupancy: RawOccupancy) =>
        totalAvailable + parseInt(rawOccupancy.Available),
      0,
    );
    const newFacility: Facility = {
      name: rawFacility.Description,
      occupancy: {
        capacity,
        available,
      },
    };

    return newFacility;
  });

  return occupancyData;
});
