import React, { useRef, useEffect } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import TextField from '@mui/material/TextField';

const libraries = ['places'];

const SearchBox = ({ onPlaceSelected, address, setAddress }) => {
    const apikey = process.env.NEXT_PUBLIC_MAP_API_KEY;
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apikey,
        libraries,
        version: "weekly",
    });

    const autocompleteRef = useRef();

    const handleLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
        if (autocomplete.input) {
            autocomplete.input.value = address;
        }
    };

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            onPlaceSelected(autocompleteRef.current);
        }
    };

    useEffect(() => {
        if (autocompleteRef.current && autocompleteRef.current.input) {
            autocompleteRef.current.input.value = address;
        }
    }, [address]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder=""
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                inputRef={(input) => {
                    if (autocompleteRef.current && input) {
                        autocompleteRef.current.input = input;
                    }
                }}
                sx={{ width: '90%' }}
            />
        </Autocomplete>
    );
};

export default SearchBox;
