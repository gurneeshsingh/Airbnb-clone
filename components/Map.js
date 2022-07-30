import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import { useState } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';

// we are using an npm package react-map-gl that creates a wrapper for the map to be included in the application
// we will use another package geolib which will help us to make a center of our various lats and longs in the maap


const Map = ({ allData }) => {

    // we have got the adddata , but we neew to transform that objet into {latitude: value, lobgitude: value } , for that we will do a map method over the addData and return an object with our desired result and store it in a variable 

    const coordinate = allData?.map((item) => ({
        latitude: item.coordinate.lat,
        longitude: item.coordinate.lon
    }));

    // now we have got the lats and longs , we will find the center of those using geolib package 

    const center = getCenter(coordinate);

    // we have to gove a viewport property to the map , thus we are defining that here 

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

    // make a state for the selected location of the marker on the map , whenever we click on a marker, the info of that place should get stored in a state for us to show info about that place on the map 

    const [selectedLocation, setSelectedLocation] = useState({});
    

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/gurneeshsingh/cksktwaub0k0n17ooh6znovts"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {/* we will return the marker and the popup here so that it appears on the map , it will use lat and long of the places  */}

            {allData.map((place) => (
                <div key={place.id}>
                    <Marker
                        latitude={place.coordinate.lat}
                        longitude={place.coordinate.lon}
                    >
                        <LocationMarkerIcon className="h-6 text-red-400 cursor-pointer animate-bounce " onClick={() => setSelectedLocation(place)} />
                    </Marker>

                    {/* a popup should appear whenever we click on a place , so we will conditionally rendr the popup of the clicked place   */}
                    {selectedLocation?.coordinate?.lon === place.coordinate.lon ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={place.coordinate.lat}
                            longitude={place.coordinate.lon}
                            className="z-50 font-poppins font-medium text-red-400 text-sm outline-none rounded-3xl  "
                        >
                            <div className="flex flex-col items-center justify-center px-1 ">
                                <p>{place.name}</p>
                                <p>{place.ratePlan?.price?.current}</p>

                            </div>

                        </Popup>
                    ) : (
                        false
                    )}

                </div>
            ))}

        </ReactMapGL>
    )
}

export default Map
