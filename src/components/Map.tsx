import { MapContainer, TileLayer } from "react-leaflet";

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
    </MapContainer>
  );
};
