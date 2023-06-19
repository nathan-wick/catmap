import React, {FC, createContext, useEffect, useState} from "react";
import {getFunctions, httpsCallable} from "firebase/functions";
import {FacilityDataDTO} from "../types/FacilityDataDTO";
import estimateOccupancy from "../utilities/estimateOccupancy";
import getFacilityLocation from "../utilities/getFacilityLocation";

const emptyFacilityData: FacilityDataDTO = {
    "lastWeekFacilityData": [],
    "todayFacilityData": []
};

// eslint-disable-next-line one-var
export const FacilitiesContext = createContext<FacilityDataDTO>(emptyFacilityData),
    FacilitiesContextProvider: FC<{
        children: JSX.Element
    }> = ({children}) => {

        const [
                facilityData,
                setFacilityData
            ] =
        useState<FacilityDataDTO>(emptyFacilityData),
            functions = getFunctions(),
            getFacilityData = httpsCallable(
                functions,
                "getFacilityData"
            );

        useEffect(
            () => {

                getFacilityData().
                    then((result) => {

                        const newFacilityData = result.data as FacilityDataDTO;
                        newFacilityData.estimatedFacilityData = estimateOccupancy(newFacilityData);
                        // eslint-disable-next-line one-var
                        const {todayFacilityData} = newFacilityData,
                            currentFacilityData = todayFacilityData[todayFacilityData.length - 1];
                        if (currentFacilityData) {

                            for (const facility of currentFacilityData) {

                                const location = getFacilityLocation(facility.name);
                                facility.location = location;

                            }
                            setFacilityData(newFacilityData);

                        }

                    });

            },
            []
        );

        return <FacilitiesContext.Provider
            value={facilityData}>
            {children}
        </FacilitiesContext.Provider>;

    };

export default FacilitiesContextProvider;
