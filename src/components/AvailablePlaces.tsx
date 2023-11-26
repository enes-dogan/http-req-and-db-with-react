import Places from './Places.js';
import { AvailablePlacesProps } from '../types';

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlacesProps) {
  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={() => onSelectPlace(undefined)}
    />
  );
}
