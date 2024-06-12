import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: -12.084305021823578,
    lng: -76.97130634495585,
};

const libraries = ['places'];

const MapComponent = ({ onMapLoad, mapRef, markerPosition, onMarkerDragEnd }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA9mQSlz1Us6immUBBq0adHUSn87_GyGt0',
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
 