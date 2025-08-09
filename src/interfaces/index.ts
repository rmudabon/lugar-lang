import type { Feature, GeoJsonProperties, LineString } from 'geojson';

export interface Route {
  name: string;
  route: Feature<LineString, GeoJsonProperties>;
  color: string;
}

export interface FareMarkerProps {
  name: string;
  kilometer: number;
  position: [number, number];
  color: string;
}

export interface EndMarkerProps {
  position: [number, number];
  color: string;
  isOrigin: boolean;
}

export type LongLatList = [number, number][];
