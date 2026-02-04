import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapUpdater = ({ lat, lon }) => {
    const map = useMap();

    useEffect(() => {
        if (lat && lon) {
            map.setView([lat, lon], 13); // Zoom 13 or whatever you want
        }
    }, [lat, lon, map]);

    return null;
};

export default MapUpdater;
