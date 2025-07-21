import { calculateFare } from "@/constants/util";
import type { FareMarkerProps } from "@/interfaces";
import { Marker } from "@adamscybot/react-leaflet-component-marker";
import { Popup } from "react-leaflet";

const FareIcon = ({ label, color }: { label: string; color: string }) => (
  <div
    className="rounded-full border-2 border-primary text-center bg-white w-8 h-8 flex flex-col items-center justify-center"
    style={{
      borderColor: color,
    }}
  >
    <h5 className="text-sm font-bold">{label}</h5>
  </div>
);

export const FareMarker = ({ kilometer, position, color }: FareMarkerProps) => {
  const fareLabel = calculateFare(kilometer);
  return (
    <Marker
      position={position}
      icon={<FareIcon label={fareLabel.toString()} color={color} />}
    >
      <Popup>
        <div className="flex flex-col gap-2">
          <div>
            <h5 className="font-bold">{kilometer} km(s) from origin</h5>
          </div>
          <div className="flex justify-between items-center gap-2">
            <h5 className="font-bold">Estimated fare:</h5>
            <h5>&#8369;{fareLabel}</h5>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
