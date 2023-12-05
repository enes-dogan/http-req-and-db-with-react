import { useRef, useState, useCallback } from 'react';
import { AvaiablePlace } from './types';

import Places from './components/Places.tsx';
import Modal from './components/Modal.tsx';
import DeleteConfirmation from './components/DeleteConfirmation.tsx';
import AvailablePlaces from './components/AvailablePlaces.tsx';

import logoImg from './assets/logo.png';

function App() {
  const selectedPlace = useRef<AvaiablePlace>();

  const [userPlaces, setUserPlaces] = useState<AvaiablePlace[]>([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place: AvaiablePlace) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(selectedPlace: AvaiablePlace) {
    setUserPlaces(prevPickedPlaces => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some(place => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
  }

  const handleRemovePlace = useCallback(() => {
    // deleted async for now
    setUserPlaces(prevPickedPlaces =>
      prevPickedPlaces.filter(place => place.id !== selectedPlace.current!.id)
    );

    setModalIsOpen(false);
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
