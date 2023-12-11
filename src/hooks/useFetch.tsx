import { useState, useEffect } from 'react';
import { AvailablePlace } from '../types';
import { fetchPlaces } from '../http';

export function useFetch(
  fetchParam: string,
  initialData: AvailablePlace[] = []
) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<{ message: string }>({ message: '' });
  const [fetchedData, setFetchedData] = useState<AvailablePlace[]>(initialData);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchPlaces(fetchParam);
        setFetchedData(data);
      } catch (error) {
        console.error(error);
        setError({
          message: `Could not fetch ${fetchParam}, please try again later.`,
        });
      }
      setIsFetching(false);
    }

    void fetchData();
  }, [fetchParam]);

  return { isFetching, error, fetchedData };
}
