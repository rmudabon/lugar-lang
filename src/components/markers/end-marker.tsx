import type { EndMarkerProps } from "@/interfaces";
import { Marker } from "@adamscybot/react-leaflet-component-marker";

const EndIcon = ({ isOrigin, color }: { isOrigin: boolean; color: string }) => (
    <div
        className="rounded-full border-2 border-primary text-center bg-white w-8 h-8 flex flex-col items-center justify-center"
        style={{
            borderColor: color,
        }}
    >
        <h5 className="text-xs font-semibold">{isOrigin ? 'A' : 'B'}</h5>
    </div>
);

export const EndMarker = ({
    position,
    color,
    isOrigin
}: EndMarkerProps) => {
    return (
        <Marker
            position={position}
            icon={<EndIcon isOrigin={isOrigin} color={color} />}
        />
    );
};