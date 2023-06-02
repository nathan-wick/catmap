import {Facility} from "../types/Facility";

const getStoredFacilityData = async (
  date: Date,
  database: FirebaseFirestore.Firestore
) => {
  const dateCollectionReference = database
    .collection("years")
    .doc(String(date.getFullYear()))
    .collection("months")
    .doc(String(date.getMonth() + 1))
    .collection("days")
    .doc(String(date.getDate()))
    .collection("hours");
  const dateCollectionSnapshot = await dateCollectionReference
    .orderBy("hour").get();
  const storedFacilityData: Facility[][] = [];

  dateCollectionSnapshot.forEach((document) =>
    storedFacilityData.push(document.data().facilityData as Facility[])
  );

  return storedFacilityData;
};

export default getStoredFacilityData;
