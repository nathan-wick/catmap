import {Location} from '../types/Location';

const getFacilityLocation = (name: string) => {
  const consistentName = name.toUpperCase().split(' ').join('_');
  const facilityLocation: Location = {
    latitude: 0,
    longitude: 0,
  };

  switch (consistentName) {
    case 'CCM_GARAGE':
      facilityLocation.latitude = 39.129883;
      facilityLocation.longitude = -84.516847;
      break;
    case 'CALHOUN_GARAGE':
      facilityLocation.latitude = 39.128363;
      facilityLocation.longitude = -84.516566;
      break;
    case 'CAMPUS_GREEN_GARAGE':
      facilityLocation.latitude = 39.135359;
      facilityLocation.longitude = -84.513956;
      break;
    case 'CLIFTON_COURT_GARAGE':
      facilityLocation.latitude = 39.134060;
      facilityLocation.longitude = -84.517809;
      break;
    case 'CORRY_GARAGE':
      facilityLocation.latitude = 39.129279;
      facilityLocation.longitude = -84.512919;
      break;
    case 'EDEN_GARAGE':
      facilityLocation.latitude = 39.137643;
      facilityLocation.longitude = -84.505481;
      break;
    case 'KINGSGATE_GARAGE':
      facilityLocation.latitude = 39.136828;
      facilityLocation.longitude = -84.507836;
      break;
    case 'STRATFORD_GARAGE':
      facilityLocation.latitude = 39.130637;
      facilityLocation.longitude = -84.521114;
      break;
    case 'UNIVERSITY_AVE_GARAGE':
      facilityLocation.latitude = 39.133281;
      facilityLocation.longitude = -84.511813;
      break;
    case 'UNIVERSITY_AVE_GARAGE_LEVEL_1':
      facilityLocation.latitude = 39.135266;
      facilityLocation.longitude = -84.511589;
      break;
    case 'VARSITY_VILLAGE_GARAGE':
      facilityLocation.latitude = 39.130152;
      facilityLocation.longitude = -84.515974;
      break;
    case 'WOODSIDE_GARAGE':
      facilityLocation.latitude = 39.134997;
      facilityLocation.longitude = -84.515002;
      break;
  }

  return facilityLocation;
};

export default getFacilityLocation;
