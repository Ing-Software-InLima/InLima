import React, { useRef, useEffect } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import NoSsr from '@mui/material/NoSsr';
import InputLabel from '@mui/material/InputLabel';
import { TextField } from '@mui/material';


const libraries = ['places'];

const SearchBox = ({ onPlaceSelected, address, setAddress }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA9mQSlz1Us6immUBBq0adHUSn87_GyGt0',
        libraries,
        version: "weekly",
    });

    const autocompleteRef = useRef();
    const inputRef = useRef();

    const handleLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            onPlaceSelected(autocompleteRef.current);
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = address;
        }
    }, [address]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search for places"
                
            />
        </Autocomplete>
    );
};

export default SearchBox;
