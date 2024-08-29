import Placeholder from '@assets/icons/Placeholder.svg';
import { SyntheticEvent } from 'react';

export const handleProductPictireError = (e: SyntheticEvent) => {
  const image = e.target as HTMLImageElement;
  image.src = Placeholder;
};
