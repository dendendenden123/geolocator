import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MapUpdater from "./MapUpdater";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const GeolocationCard = ({ data }) => {
    if (!data) return null;

    return (
        <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Geolocation Information
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Current IP:{" "}
                        <span className="font-medium">{data.ip}</span>
                    </p>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Location Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                                    Location
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Country
                                        </p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-white mt-1">
                                            {data.country || "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Region / State
                                        </p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-white mt-1">
                                            {data.regionName || "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            City
                                        </p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-white mt-1">
                                            {data.city || "-"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                                    Network
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            ISP
                                        </p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-white mt-1">
                                            {data.isp || "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Organization
                                        </p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-white mt-1">
                                            {data.org || "-"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                                    Technical Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Timezone
                                        </p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-white mt-1">
                                            {data.timezone || "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Coordinates
                                        </p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-white mt-1">
                                            {data.lat && data.lon
                                                ? `${data.lat}, ${data.lon}`
                                                : "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Postal Code
                                        </p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-white mt-1">
                                            {data.postalCode || "-"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="mt-4">
                                {/* Map Section */}
                                <div className="mt-4">
                                    {data.lat && data.lon ? (
                                        <MapContainer
                                            center={[data.lat, data.lon]}
                                            zoom={13}
                                            scrollWheelZoom={false}
                                            className="leaflet-container"
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <Marker
                                                position={[data.lat, data.lon]}
                                            >
                                                <Popup>
                                                    {data.city},{" "}
                                                    {data.regionName},{" "}
                                                    {data.country} <br />
                                                    IP: {data.ip}
                                                </Popup>
                                            </Marker>
                                            <MapUpdater
                                                lat={data.lat}
                                                lon={data.lon}
                                            />
                                        </MapContainer>
                                    ) : (
                                        <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <p className="text-gray-500 text-sm">
                                                Map not available
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeolocationCard;
