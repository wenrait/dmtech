import Placeholder from '@assets/icons/Placeholder.svg';
import { SyntheticEvent } from 'react';

export const handleProductPictireError = (e: SyntheticEvent) => {
  const image = e.target as HTMLImageElement;
  image.src = Placeholder;
};

export const dividePrice = (price: number) => {
  const integer = Math.floor(price / 1000);
  const decimal = price % 1000;

  if (integer > 0) {
    return `${integer} ${decimal.toString().padStart(3, '0')} ₽`;
  } else {
    return `${price} ₽`;
  }
};
