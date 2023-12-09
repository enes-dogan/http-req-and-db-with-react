import { AvaiablePlace } from './types';

export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const resData = (await response.json()) as { places: AvaiablePlace[] };

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return resData.places;
}

export async function updateUserPlaces(places: AvaiablePlace[]) {
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
