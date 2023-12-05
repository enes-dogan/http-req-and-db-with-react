export type AvaiablePlace = {
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
  places: AvaiablePlace[],
  lat: number,
  lon: number
) => AvaiablePlace[];

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export interface PlacesProps {
  title: string;
  places: AvaiablePlace[];
  fallbackText?: string;
  onSelectPlace: (place: AvaiablePlace) => void;
  isLoading?: boolean;
  loadingText?: string;
}

export interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface AvailablePlacesProps {
  onSelectPlace: (place: AvaiablePlace) => void;
}

export interface ErrorProps {
  title: string;
  message: string;
  onConfirm?: () => void;
}
