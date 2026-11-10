/** Envelope returned by the API for successful requests. */
export type ApiResponse<T> = {
  data: T;
  message: string;
  error: boolean;
};

/** Normalised error shape for failed requests. */
export type ApiError = {
  errorMessage: string;
  errorCode: string;
  status: number;
};
