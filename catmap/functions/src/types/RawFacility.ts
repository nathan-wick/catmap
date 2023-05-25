import {RawOccupancy} from "./RawOccupancy";

export declare interface RawFacility {
  FacilityID: string;
  Description: string;
  Occupancy: RawOccupancy[];
}
