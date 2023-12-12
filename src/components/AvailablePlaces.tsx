import { useFetch } from '../hooks/useFetch.tsx';
import { sortPlacesByDistance } from '../loc';

import { AvailablePlacesProps } from '../types';

import Modal from './Modal.tsx';
import Error from './Error.tsx';
import Places from './Places.tsx';

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlacesProps) {
  const {
    isFetching,
    error,
    setError,
    fetchedData: availablePlaces,
    setFetchedData: setAvailablePlaces,
  } = useFetch('places', []);

  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const sortedPlaces = sortPlacesByDistance(availablePlaces, lat, lon);
    setAvailablePlaces(sortedPlaces);
  });

  if (error.message !== '') {
    return (
      <Modal
        open={error.message !== ''}
        onClose={() => setError({ message: '' })}
      >
        <Error
          title="Failed to load places."
          message={error.message}
          onConfirm={() => setError({ message: '' })}
        />
      </Modal>
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
