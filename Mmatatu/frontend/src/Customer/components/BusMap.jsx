import dynamic from "next/dynamic";

const Map = dynamic(() => import("react-map-gl"), { ssr: false });

export default function BusMap() {
  return (
    <div className="h-96">
      <Map
        initialViewState={{
          longitude: 36.8219,
          latitude: -1.2921,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      />
    </div>
  );
}
