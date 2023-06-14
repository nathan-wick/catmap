import {Facility} from './Facility';

export declare interface FacilityDataDTO {
    todayFacilityData: Facility[][],
    lastWeekFacilityData: Facility[][],
    estimatedFacilityData?: Facility[][],
}
