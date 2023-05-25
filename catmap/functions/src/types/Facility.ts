import {Occupancy} from "./Occupancy";
import {Location} from "./Location";

export declare interface Facility {
    name: string,
    occupancy: Occupancy,
    location?: Location
}
