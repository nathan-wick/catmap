import {FacilityDataDTO} from "./types/FacilityDataDTO";
import changeTimezone from "./utilities/changeTimezone";
import getCurrentFacilityData from "./utilities/getCurrentFacilityData";
import {getFirestore} from "firebase-admin/firestore";
import getStoredFacilityData from "./utilities/getStoredFacilityData";
import {initializeApp} from "firebase-admin/app";
import {onCall} from "firebase-functions/v2/https";
import {onSchedule} from "firebase-functions/v2/scheduler";

initializeApp();

const database = getFirestore();

exports.getFacilityData = onCall(async () => {

    const today = changeTimezone(
            new Date(),
            "America/New_York"
        ),
        lastWeek = changeTimezone(
            new Date(),
            "America/New_York"
        );
    lastWeek.setDate(lastWeek.getDate() - 7);
    // eslint-disable-next-line one-var
    const todayFacilityData = await getStoredFacilityData(
            today,
            database
        ),
        lastWeekFacilityData = await getStoredFacilityData(
            lastWeek,
            database
        ),
        facilityData: FacilityDataDTO = {
            lastWeekFacilityData,
            todayFacilityData
        };

    return facilityData;

});

exports.storeFacilityData = onSchedule(
    "0 * * * *",
    async () => {

        const currentFacilityData = await getCurrentFacilityData();

        if (currentFacilityData) {

            const today = changeTimezone(
                    new Date(),
                    "America/New_York"
                ),
                documentReference = database.
                    collection("years").
                    doc(String(today.getFullYear())).
                    collection("months").
                    doc(String(today.getMonth() + 1)).
                    collection("days").
                    doc(String(today.getDate())).
                    collection("hours").
                    doc(String(today.getHours()));

            await documentReference.set({
                "facilityData": currentFacilityData,
                "hour": today.getHours()
            });

        }

    }
);
