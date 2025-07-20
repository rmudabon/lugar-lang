import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { toLatLongList } from "../constants/util";
import {
  BUHANGIN_VIA_JP_LAUREL_TO_DOWNTOWN,
  BUHANGIN_VIA_JP_LAUREL_TO_NHA,
} from "../constants/routes";

const buhanginJPLaurelRoute = toLatLongList(BUHANGIN_VIA_JP_LAUREL_TO_DOWNTOWN);
const buhanginJPLaurelHomeRoute = toLatLongList(BUHANGIN_VIA_JP_LAUREL_TO_NHA);

export const Map = () => {
  return (
    <MapContainer
      center={[7.063366, 125.609113]}
      zoom={17}
      style={{
        height: "100vh",
        width: "100vw",
        zIndex: 0,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline
        pathOptions={{ color: "red" }}
        positions={buhanginJPLaurelRoute}
      />
      <Polyline
        pathOptions={{ color: "blue", dashArray: "9, 9" }}
        positions={buhanginJPLaurelHomeRoute}
      />
    </MapContainer>
  );
};
