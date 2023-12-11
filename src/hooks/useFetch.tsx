import { useState, useEffect } from 'react';

import { fetchPlaces } from '../http';
import { AvailablePlace } from '../types';

export function useFetch(
  fetchParam: string,
  initialData: AvailablePlace[] = []
) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<{ message: string }>({ message: '' });
  const [fetchedData, setFetchedData] = useState<AvailablePlace[]>(initialData);

  useEffect(() => {
    async function fetchFn() {
      setIsFetching(true);
      try {
        const data = await fetchPlaces(fetchParam);
        setFetchedData(data);
      } catch (error) {
        console.error(error);
        setError({
          message: 'Error occured, please try again later.',
        });
      }
      setIsFetching(false);
    }

    void fetchFn();
  }, [fetchParam]);

  return { isFetching, error, fetchedData, setError };
}
