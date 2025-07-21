import type { Feature, GeoJsonProperties, LineString } from "geojson";

export interface Route {
  name: string;
  route: Feature<LineString, GeoJsonProperties>;
  color: string;
}

export interface FareMarkerProps {
  kilometer: number;
  position: [number, number];
  color: string;
}
