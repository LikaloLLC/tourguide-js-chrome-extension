import { SetStateAction } from 'react';

export interface UseState {
  value: string;
  setValue: (value: SetStateAction<string>) => void;
}

export interface ImageModalProps {
  stepPosition: number;
  toggleModalDisplay: (value: SetStateAction<boolean>) => void;
}

export interface ImagePickerProps {
  stepPosition: number;
  srcValue: string;
}
