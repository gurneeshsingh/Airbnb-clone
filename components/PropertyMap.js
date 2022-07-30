import ReactMapGL, { Marker } from 'react-map-gl';
import { useState } from 'react';
import { HomeIcon } from '@heroicons/react/solid';



const PropertyMap = ({ lat, lon }) => {


    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: lat,
        longitude: lon,
        zoom: 12
    })


    return (
        <ReactMapGL
            mapStyle="mapbox://styles/gurneeshsingh/cksktwaub0k0n17ooh6znovts"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
           
        >
            <Marker
                latitude={lat}
                longitude={lon}
            >
            <HomeIcon className="h-12 text-white cursor-pointer  animate-bounce p-3 bg-red-400 rounded-full bg-opacity-60 z-50 "/>
            </Marker>
        </ReactMapGL>
    )
}

export default PropertyMap;
