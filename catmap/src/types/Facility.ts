export declare interface Facility {
    name: string,
    occupancy: {
        capacity: number,
        available: number
    },
    location: {
        latitude: number,
        longitude: number
    }
}
