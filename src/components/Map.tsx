import { MapContainer, Polyline, TileLayer, ZoomControl } from "react-leaflet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { toLatLongList } from "../constants/util";
import {
  BUHANGIN_VIA_JP_LAUREL_TO_DOWNTOWN,
  BUHANGIN_VIA_JP_LAUREL_TO_NHA,
} from "../constants/routes";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, Minus } from "lucide-react";
import { useState } from "react";

interface Route {
  name: string;
  route: [number, number][];
  color: string;
}

const routeOptions: Route[] = [
  {
    name: "Buhangin via JP Laurel to Downtown",
    route: toLatLongList(BUHANGIN_VIA_JP_LAUREL_TO_DOWNTOWN),
    color: "red",
  },
  {
    name: "Buhangin via JP Laurel to NHA",
    route: toLatLongList(BUHANGIN_VIA_JP_LAUREL_TO_NHA),
    color: "blue",
  },
];

export const Map = () => {
  const [selectedRoutes, setSelectedRoutes] = useState<Route[]>([]);

  const toggleRoute = (route: Route) => {
    console.log(selectedRoutes);
    if (selectedRoutes.findIndex((r) => r.name === route.name) !== -1) {
      setSelectedRoutes((prevRoutes) =>
        prevRoutes.filter((prevRoute) => prevRoute.name !== route.name)
      );
    } else {
      setSelectedRoutes((prevRoutes) => [...prevRoutes, route]);
    }
  };

  return (
    <div className="w-full">
      <MapContainer
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
            positions={route.route}
          />
        ))}
        <ZoomControl position="topright" />
      </MapContainer>
      <div className="absolute top-0 max-w-sm z-10">
        <Collapsible className="bg-white shadow-md p-2 pl-4 md:min-w-xs m-3 rounded-md">
          <div className="flex justify-between gap-4 items-center">
            <h4 className="text-base font-medium">Routes</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronsUpDown className="w-4 h-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="max-h-64 overflow-y-auto flex flex-col gap-2 mt-2">
            {routeOptions.map((route) => {
              const isSelected = selectedRoutes.find(
                (selectedRoute) => selectedRoute.name === route.name
              );
              return (
                <Button
                  key={route.name}
                  variant="ghost"
                  onClick={() => {
                    toggleRoute(route);
                  }}
                  className="justify-between font-normal items-center px-2"
                >
                  {route.name}
                  {isSelected && <Check className="w-4 h-4 text-green-600" />}
                </Button>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      </div>
      {selectedRoutes.length > 0 && (
        <div className="absolute bottom-3 max-w-sm z-10">
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
