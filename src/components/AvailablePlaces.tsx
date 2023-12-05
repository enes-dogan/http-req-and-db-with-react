import { useState, useEffect } from 'react';
import { AvailablePlacesProps } from '../types';
import { AvaiablePlace } from '../types';
import { sortPlacesByDistance } from '../loc';

import Places from './Places';
import Error from './Error';

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlacesProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState<AvaiablePlace>([]);
  const [error, setError] = useState<{ message: string }>({ message: '' });

  useEffect(() => {
    setIsFetching(true);
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = (await response.json()) as { places: AvaiablePlace };

        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const sortedPlaces = sortPlacesByDistance(resData.places, lat, lon);
          setAvailablePlaces(sortedPlaces);
        });
      } catch (error: any) {
        console.error(error);
        setError({
          message:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (error.message as string) ||
            'Could not fetch places, please try again later.',
        });
      }
      setIsFetching(false);
    }
    void fetchData();
  }, []);

  if (error.message.length > 0) {
    return (
      <Error
        title="Failed to load places."
        message={error.message}
        onConfirm={() => setError({ message: '' })}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      isLoading={isFetching}
      loadingText="Loading places..."
      onSelectPlace={() => onSelectPlace(undefined)}
    />
  );
}
