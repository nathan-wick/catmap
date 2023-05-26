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
  }

  return facilityLocation;
};

export default getFacilityLocation;
