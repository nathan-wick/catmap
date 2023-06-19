import {Location} from "./Location";
import {Occupancy} from "./Occupancy";

export declare interface Facility {
    name: string,
    occupancy: Occupancy,
    location?: Location
}
