const isAvailable = 'geolocation' in navigator;

export class GeoLocationUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, GeoLocationUnavailableError.prototype);
  }
}

export enum PositionErrorCode {
  None,
  PermissionDenied,
  PositionUnavailable,
  Timeout,
}

// "native" PositionError is a type, hence the custom error
export class PositionError extends Error {
  public code = PositionErrorCode.None;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, PositionError.prototype);
  }
}

// simple promise wrapper around getCurrentPosition,
// so that I can use it with async or yield
const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!isAvailable) {
      reject(new GeoLocationUnavailableError('Geolocation API not available'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(new PositionError(error.message, error.code));
      }
    );
  });
};

export const geoLocation = {
  isAvailable,
  getCurrentPosition,
};
