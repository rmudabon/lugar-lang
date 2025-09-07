import { MapContainer, Polyline, TileLayer, ZoomControl } from "react-leaflet";
import { toLatLong, toLatLongList } from "../constants/util";
import { Minus } from "lucide-react";
import { along, cleanCoords, length } from "@turf/turf";

import { FareMarker } from "./markers/fare-marker";
import type { EndMarkerProps, FareMarkerProps } from "@/interfaces";
import type { LatLngBoundsLiteral } from "leaflet";
import { EndMarker } from "./markers/end-marker";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useRouteStore } from "@/lib/store";
import { RouteSelector } from "./map/route-selector";
const bounds: LatLngBoundsLiteral = [
  [7.493196470122287, 125.89645385742189],
  [6.767579526961214, 125.07797241210939],
];

export const Map = () => {
  const { selectedRoutes } = useRouteStore();
  const fareMarkers: FareMarkerProps[] = [];
  const endMarkers: EndMarkerProps[] = [];

  if (selectedRoutes.length > 0) {
    selectedRoutes.forEach((route) => {
      const markers: FareMarkerProps[] = [];
      const routeLength = length(route.route, { units: "kilometers" });
      const kilometerArray = Array.from(
        { length: Math.floor(routeLength) },
        (_, index) => index + 1
      );
      for (const kilometer of kilometerArray) {
        const newMarker = along(route.route, kilometer);
        const transformedMarker = toLatLong(
          newMarker.geometry.coordinates[0],
          newMarker.geometry.coordinates[1]
        );
        if (
          markers.findIndex(
            (marker) =>
              marker.position[0] === transformedMarker[0] &&
              marker.position[1] === transformedMarker[1]
          ) === -1
        ) {
          markers.push({
            name: route.name,
            kilometer,
            position: transformedMarker,
            color: route.color,
          });
        }
      }
      fareMarkers.push(...markers);
      endMarkers.push({
        position: toLatLong(
          route.route.geometry.coordinates[0][0],
          route.route.geometry.coordinates[0][1]
        ),
        color: route.color,
        isOrigin: true,
      });
      endMarkers.push({
        position: toLatLong(
          route.route.geometry.coordinates[
            route.route.geometry.coordinates.length - 1
          ][0],
          route.route.geometry.coordinates[
            route.route.geometry.coordinates.length - 1
          ][1]
        ),
        color: route.color,
        isOrigin: false,
      });
    });
  }

  return (
    <div className="w-full">
      <MapContainer
        maxBounds={bounds}
        center={[7.063366, 125.609113]}
        zoom={17}
        zoomControl={false}
        className="h-svh w-full z-0 absolute top-0 left-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedRoutes.map((route) => (
          <Polyline
            key={route.name}
            pathOptions={{ color: route.color }}
            positions={toLatLongList(
              cleanCoords(route.route).geometry.coordinates
            )}
            eventHandlers={{
              click: (e) => {
                e.target.bringToFront();
              },
            }}
          />
        ))}

        <MarkerClusterGroup>
          {fareMarkers.map((marker, index) => (
            <FareMarker
              key={index}
              name={marker.name}
              position={marker.position}
              kilometer={marker.kilometer}
              color={marker.color}
            />
          ))}
          {endMarkers.map((marker, index) => (
            <EndMarker
              key={index}
              position={marker.position}
              color={marker.color}
              isOrigin={marker.isOrigin}
            />
          ))}
        </MarkerClusterGroup>

        <ZoomControl position="topright" />
      </MapContainer>
      <div className="absolute top-0 max-w-sm z-10">
        <RouteSelector />
      </div>
      {selectedRoutes.length > 0 && (
        <div className="absolute bottom-3 max-w-sm max-h-64 overflow-y-auto z-10">
          <div className="bg-white shadow-md p-4 m-3 rounded-md flex flex-col items-baseline">
            <div className="flex flex-col gap-2 w-full">
              {selectedRoutes.map((route) => (
                <div
                  key={route.name}
                  className="flex justify-between items-center gap-2"
                >
                  <h5 className="text-sm">{route.name}</h5>
                  <Minus
                    className="w-6 h-6"
                    style={{
                      color: route.color,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
