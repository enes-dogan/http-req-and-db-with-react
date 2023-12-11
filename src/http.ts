import { AvailablePlace } from './types';

export async function fetchPlaces(url = 'places') {
  const response = await fetch(`http://localhost:3000/${url}`);
  const resData = (await response.json()) as { places: AvailablePlace[] };

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return resData.places;
}

export async function updateUserPlaces(places: AvailablePlace[]) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData = (await response.json()) as { message: string };

  if (!response.ok) {
    throw new Error('Failed to update user places');
  }

  return resData.message;
}
