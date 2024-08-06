import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const handleRTKQueryError = (
  error: FetchBaseQueryError | SerializedError,
) => {
  if (
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    'message' in error.data
  ) {
    return error.data.message as string;
  } else if ('message' in error) {
    return error.message as string;
  } else {
    return 'Неизвестная ошибка';
  }
};
