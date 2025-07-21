import {
  BASE_FARE,
  BASE_FARE_THRESHOLD_KM,
  FARE_PER_KM,
  STUDENT_FARE,
  STUDENT_FARE_PER_KM,
} from "./fare";

export const toLatLong = (long: number, lat: number): [number, number] => [
  lat,
  long,
];
export const toLatLongList = (list: [number, number][]): [number, number][] =>
  list.map((coordinates) => toLatLong(coordinates[0], coordinates[1]));

export const calculateFare = (kilometer: number) => {
  if (kilometer <= BASE_FARE_THRESHOLD_KM) return BASE_FARE;
  return BASE_FARE + (kilometer - BASE_FARE_THRESHOLD_KM) * FARE_PER_KM;
};

export const calculateDiscountedFare = (kilometer: number) => {
  if (kilometer <= BASE_FARE_THRESHOLD_KM) return STUDENT_FARE;
  return (
    BASE_FARE -
    STUDENT_FARE +
    (kilometer - BASE_FARE_THRESHOLD_KM) * STUDENT_FARE_PER_KM
  );
};
