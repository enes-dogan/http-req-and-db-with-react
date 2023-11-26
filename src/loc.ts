import { CalculateDistance } from './types';
import { SortPlacesByDistance } from './types';

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

const calculateDistance: CalculateDistance = function (lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const l1 = toRad(lat1);
  const l2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

export const sortPlacesByDistance: SortPlacesByDistance = function (
  places,
  lat,
  lon
) {
  const sortedPlaces = [...places];
  sortedPlaces.sort((a, b) => {
    a.lat = a.lat || 0;
    a.lon = a.lon || 0;
    b.lat = b.lat || 0;
    b.lon = b.lon || 0;
    const distanceA = calculateDistance(lat, lon, a.lat, a.lon);
    const distanceB = calculateDistance(lat, lon, b.lat, b.lon);
    return distanceA - distanceB;
  });
  return sortedPlaces;
};
