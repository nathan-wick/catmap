import {onCall} from "firebase-functions/v2/https";
import {onSchedule} from "firebase-functions/v2/scheduler";
import {initializeApp} from "firebase-admin/app";
import getCurrentFacilityData from "./utilities/getCurrentFacilityData";
import {getFirestore} from "firebase-admin/firestore";
import changeTimezone from "./utilities/changeTimezone";
import getStoredFacilityData from "./utilities/getStoredFacilityData";

initializeApp();

const database = getFirestore();

exports.getFacilityData = onCall(async () => {
  const today = changeTimezone(new Date(), "America/New_York");
  const lastWeek = new Date(today.getDate() - 7);
  const currentFacilityData = await getCurrentFacilityData();
  const todayFacilityData = await getStoredFacilityData(today, database);
  const lastWeekFacilityData = await getStoredFacilityData(lastWeek, database);
  const facilityData = {
    currentFacilityData,
    todayFacilityData,
    lastWeekFacilityData,
  };

  return facilityData;
});

exports.storeFacilityData = onSchedule("0 * * * *", async () => {
  const currentFacilityData = await getCurrentFacilityData();

  if (currentFacilityData) {
    const today = changeTimezone(new Date(), "America/New_York");
    const documentReference = database
      .collection("years")
      .doc(String(today.getFullYear()))
      .collection("months")
      .doc(String(today.getMonth() + 1))
      .collection("days")
      .doc(String(today.getDate()))
      .collection("hours")
      .doc(String(today.getHours()));

    await documentReference.set({
      facilityData: currentFacilityData,
    });
  }
});
