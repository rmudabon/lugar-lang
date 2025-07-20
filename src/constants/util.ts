export const toLatLong = (long: number, lat: number): [number, number] => [
  lat,
  long,
];
export const toLatLongList = (list: [number, number][]): [number, number][] =>
  list.map((coordinates) => toLatLong(coordinates[0], coordinates[1]));
