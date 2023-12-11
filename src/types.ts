export type AvailablePlace = {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  lat?: number;
  lon?: number;
};

export type CalculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => number;

export type SortPlacesByDistance = (
  places: AvailablePlace[],
  lat: number,
  lon: number
) => AvailablePlace[];

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export interface PlacesProps {
  title: string;
  places: AvailablePlace[];
  fallbackText: string;
  onSelectPlace: (place: AvailablePlace) => void;
  isLoading: boolean;
  loadingText: string;
}

export interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface AvailablePlacesProps {
  onSelectPlace: (place: AvailablePlace) => void;
}

export interface ErrorProps {
  title: string;
  message: string;
  onConfirm?: () => void;
}
