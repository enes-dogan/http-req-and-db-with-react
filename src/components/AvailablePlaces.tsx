import { useState, useEffect } from 'react';

import { AvailablePlacesProps } from '../types';
import { AvaiablePlace } from '../types';

import { sortPlacesByDistance } from '../loc';
import { fetchAvailablePlaces } from '../http';

import Places from './Places.tsx';
import Error from './Error.tsx';

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlacesProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState<AvaiablePlace[]>([]);
  const [error, setError] = useState<{ message: string }>();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const sortedPlaces = sortPlacesByDistance(places, lat, lon);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message: 'Could not fetch places, please try again later.',
        });
        setIsFetching(false);
      }
    }
    void fetchData();
  }, []);

  if (error) {
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
      onSelectPlace={onSelectPlace}
    />
  );
}
