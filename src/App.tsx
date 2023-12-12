import { useRef, useState, useCallback } from 'react';

import { useFetch } from './hooks/useFetch.tsx';

import { AvailablePlace } from './types';

import Modal from './components/Modal.tsx';
import Error from './components/Error.tsx';
import DeleteConfirmation from './components/DeleteConfirmation.tsx';
import Places from './components/Places.tsx';
import AvailablePlaces from './components/AvailablePlaces.tsx';

import { updateUserPlaces } from './http.ts';
import logoImg from './assets/logo.png';

function App() {
  const selectedPlace = useRef<AvailablePlace>();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState({
    message: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Custom fetch hook
  const {
    isFetching,
    error,
    setError,
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces,
  } = useFetch('user-places', []);

  function handleStartRemovePlace(place: AvailablePlace) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(selectedPlace: AvailablePlace) {
    setUserPlaces(prevPickedPlaces => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some(place => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    async function updatePlaces() {
      try {
        await updateUserPlaces([...userPlaces, selectedPlace]);
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: 'Failed to update places',
        });
        console.error(error);
      }
    }
    void updatePlaces();
  }

  const handleRemovePlace = useCallback(() => {
    async function removePlace() {
      setUserPlaces(prevPickedPlaces => {
        return prevPickedPlaces.filter(
          place => place.id !== selectedPlace.current!.id
        );
      });

      try {
        await updateUserPlaces(
          userPlaces.filter(place => place.id !== selectedPlace.current!.id)
        );
      } catch (error) {
        console.error(error);
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({ message: 'Failed to delete place' });
      }

      setModalIsOpen(false);
    }
    void removePlace();
  }, [userPlaces, setUserPlaces]);

  return (
    <>
      <Modal
        open={errorUpdatingPlaces.message !== ''}
        onClose={() => setErrorUpdatingPlaces({ message: '' })}
      >
        {errorUpdatingPlaces && (
          <Error
            title="An error occurred."
            message={errorUpdatingPlaces.message}
            onConfirm={() => setErrorUpdatingPlaces({ message: '' })}
          />
        )}
      </Modal>

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
        {error.message !== '' && (
          <Modal
            open={error.message !== ''}
            onClose={() => setError({ message: '' })}
          >
            <Error
              title="Failed to load user places"
              message={error.message}
              onConfirm={() => setError({ message: '' })}
            />
          </Modal>
        )}
        {error.message === '' && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Loading user places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
