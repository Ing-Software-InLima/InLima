import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import dotenv from 'dotenv';


dotenv.config();

const mapContainerStyle = {
    width: '90%',
    height: '400px',
};

const center = {
    lat: -12.084305021823578,
    lng: -76.97130634495585,
};

const libraries = ['places'];

const MapComponent = ({ onMapLoad, mapRef, markerPosition, onMarkerDragEnd }) => {
    const apikey = process.env.NEXT_PUBLIC_MAP_API_KEY;
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apikey,
        libraries,
        version: "weekly",
    });

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={markerPosition}
            onLoad={onMapLoad}
        >
            <Marker 
                position={markerPosition} 
                draggable={true} 
                onDragEnd={onMarkerDragEnd} 
            />
        </GoogleMap>
    );
};

export default MapComponent;
 