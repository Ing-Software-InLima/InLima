'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import NoSsr from '@mui/material/NoSsr';
import CameraIcon from '@/icons/camera';
import Advise from '@/components/Advise';
import Layout from '@/components/Layout';
import municipalidadApi from '@/api/municipalidad';
import quejaApi from '@/api/queja';

import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MapComponent from '@/components/Map';
import SearchBox from '@/components/SearchLocation';

function page({ params }) {

    const { type } = params;
    const [showAdvise, setShowAdvise] = useState(false);

    const [asunto, setAsunto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [nombreFoto, setNombreFoto] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [latitud, setLatutid] = useState(0.0);
    const [longitud, setLongitud] = useState(0.0);
    const [municipalidades, setMunicipalidades] = useState([]);
    const [municipalidad, setMunicipalidad] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [markerPosition, setMarkerPosition] = useState({ lat: -12.084305021823578, lng: -76.97130634495585 });
    const [address, setAddress] = useState("");

    const mapRef = useRef();
    //mapa
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const onPlaceSelected = (autocomplete) => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            const location = place.geometry.location;
            setMarkerPosition({ lat: location.lat(), lng: location.lng() });
            mapRef.current.panTo(location);
            mapRef.current.setZoom(15);
            setAddress(place.formatted_address); // Actualiza la dirección en el search box
        }
    };

    const onMarkerDragEnd = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarkerPosition({ lat, lng });
        // Usar Geocoder para obtener la dirección a partir de las coordenadas
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    setAddress(results[0].formatted_address);
                }
            }
        });
    };

    const fileInputRef = useRef(null);

    const handleEnviarClick = async () => {
        try {
            const queja = {
                asunto: asunto,
                descripcion: descripcion,
                foto: selectedImage,
                ubicacion_descripcion: ubicacion,
                latitud: latitud,
                longitud: longitud,
                municipalidad: municipalidad?.id
            };
            const resp = await quejaApi.agregarQueja(queja);
            console.log("Queja guardada.");
            setShowAdvise(true);
        } catch (error) {
            alert("Error al guardar.");
            console.error("Error en el registro de queja:", error);
        }
    };

    const handleSubirFoto = (e) => {
        const file = e.target.files[0];
        setNombreFoto(file.name);
        if (file) {
            const reader = new FileReader();
            reader.onload =  (event) => {
                setSelectedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };



    const handleChange = (e) => {
        const selectedMunicipalidad = municipalidades.find(muni => muni.id === parseInt(e.target.value, 10));
        setMunicipalidad(selectedMunicipalidad);
    };

    const handleEliminarFoto = () => {
        setSelectedImage('');
        setNombreFoto("");
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeBarraBaja = (text) => {
        var formattedText = text.replace(/_/g, ' ');
        formattedText = formattedText.replace(/%C3%B3/g, 'ó')
        formattedText = formattedText.replace(/%C3%BA/g, 'ú')
        formattedText = formattedText.replace(/%C3%81/g, 'Á')
        formattedText = formattedText.replace(/%C3%AD/g, 'í')
        return formattedText;
    };

    useEffect(() => {
        console.log(address)
        const formattedType = removeBarraBaja(type);
        setAsunto(formattedType);

        const fetchMunicipalidades = async () => {
            try {
                const response = await municipalidadApi.findAll();
                setMunicipalidades(response.data);
            } catch (error) {
                console.error('Error al obtener las municipalidades:', error);
            }
        };

        fetchMunicipalidades();
    }, [type]);

    useEffect(() => {
        if (asunto && descripcion && municipalidad) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [asunto, descripcion, municipalidad]);

    return (
        <Layout>
            <div>
                {type !== "Otros" ? (
                    <div className='p-4 mb-4 border-b border-black'>
                        {removeBarraBaja(type)}
                    </div>
                ) : (
                    <>
                        <div className='p-4 mb-4 border-b border-black'>
                            Otro inconveniente
                        </div>
                        <div className='pt-4 pb-4'>
                            Escriba el asunto de la queja:
                        </div>
                        <div>
                            <NoSsr>
                                <TextField
                                    value={asunto}
                                    onChange={(e) => setAsunto(e.target.value)}
                                    sx={{ width: '90%' }}
                                />
                            </NoSsr>
                        </div>
                    </>
                )}

                <div className='pt-4 pb-4'>
                    Detalle de su inquietud en este apartado:
                </div>
                <NoSsr>
                    <TextField
                        id="detalle"
                        multiline
                        maxRows={4}
                        fullWidth
                        variant="outlined"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        sx={{ width: '90%' }}
                    />
                </NoSsr>
                <div className='pt-4 pb-4'>
                    Elige el lugar donde se encuentra el inconveniente:
                </div>
                <div className='pt-4 pb-4'>
                    <SearchBox onPlaceSelected={onPlaceSelected} address={address} setAddress={setAddress} />
                </div>
                <div className='pt-4 pb-4' >
                    <MapComponent
                        onMapLoad={onMapLoad}
                        mapRef={mapRef}
                        markerPosition={markerPosition}
                        onMarkerDragEnd={onMarkerDragEnd}
                    />
                </div>
                <div className='pt-4 pb-4'>
                    Adjuntar fotos (No es obligatorio)
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/jpeg, image/png" // Acepta solo archivos JPEG y PNG
                        onChange={handleSubirFoto} // Manejar el cambio del input
                        style={{ display: 'none' }} // Estilo para ocultar el input
                        id="upload-photo" // ID para asociarlo con el botón de la cámara
                    />
                    
                    <label htmlFor="upload-photo" style={{ cursor: 'pointer' }} >
                        <CameraIcon className='bg-gray-300 rounded-lg pl-3 pr-3' />
                    </label>

                    {nombreFoto !== "" ? (
                        <div className='center'>
                            {nombreFoto}
                            <button className='rounded-2xl bg-gray-300 ml-2 mr-2 p-2' onClick={handleEliminarFoto} style={{ cursor: 'pointer' }}>
                                No adjuntar
                            </button>
                        </div>
                    ) : (<></>)}
                </div>
                <div className='mt-4'>
                    <button className='rounded-2xl text-white bg-inLima_red p-4 pl-8 pr-8' onClick={handleEnviarClick} disabled={isButtonDisabled} title={isButtonDisabled ? "Complete todos los datos" : ""}>
                        Enviar
                    </button>
                </div>
                {showAdvise && (
                    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                        <Advise Mensaje="Se envió satisfactoriamente" URL="/estado"/>
                    </div>
                )}
            </div>
        </Layout>
    )

}
export default page