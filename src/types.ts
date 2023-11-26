export type AvaiablePlace = {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  lat?: number;
  lon?: number;
}[];

export type AvaiablePlaces = {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  lat?: number;
  lon?: number;
}[];

export type CalculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => number;

export type SortPlacesByDistance = (
  places: AvaiablePlaces,
  lat: number,
  lon: number
) => AvaiablePlaces;

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export interface PlacesProps {
  title: string;
  places: AvaiablePlaces;
  fallbackText?: string;
  onSelectPlace: (id: string) => void;
}

export interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface AvailablePlacesProps {
  onSelectPlace: (selectedPlace: AvaiablePlace | undefined) => void;
}
