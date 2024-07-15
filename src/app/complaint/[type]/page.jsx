'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import NoSsr from '@mui/material/NoSsr';
import Advise from '@/components/Advise';
import Description from '@/components/Description'
import Layout from '@/components/Layout';
import municipalidadApi from '@/api/municipalidad';
import quejaApi from '@/api/queja';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MapComponent from '@/components/Map';
import SearchBox from '@/components/SearchLocation';

function Page({ params }) {
    const { type } = params;
    const [loading, setLoading] = useState(true); // Estado de carga inicial
    const [sending, setSending] = useState(false); // Estado de carga al enviar
    const [showAdvise, setShowAdvise] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [asunto, setAsunto] = useState("");
    const [latitud, setLatitud] = useState(0.0);
    const [longitud, setLongitud] = useState(0.0);
    const [municipalidades, setMunicipalidades] = useState([]);
    const [municipalidad, setMunicipalidad] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [markerPosition, setMarkerPosition] = useState({ lat: -12.084305021823578, lng: -76.97130634495585 });
    const [address, setAddress] = useState("");

    const [informacion, setInformacion] = useState({});
    
    const [popupds,setPopupds] = useState(false);

    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const onPlaceSelected = (autocomplete) => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            const location = place.geometry?.location;
            setLatitud(location.lat());
            setLongitud(location.lng());
            setMarkerPosition({ lat: location.lat(), lng: location.lng() });
            mapRef.current.panTo(location);
            mapRef.current.setZoom(15);
            setAddress(place.formatted_address);
        }
    };

    const onMarkerDragEnd = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setLatitud(lat);
        setLongitud(lng);
        setMarkerPosition({ lat, lng });

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
                setAddress(results[0].formatted_address);
            }
        });
    };

    //const fileInputRef = useRef(null);

    const handleContinueClick = async () => {
        if (asunto === '' || address === '' || latitud === '' || longitud === '' || municipalidad === '') {
            setShowAlert(true);
        } else {
            setInformacion({
                asunto: asunto,
                ubicacion_descripcion: address,
                latitud: latitud,
                longitud: longitud,
                municipalidad: municipalidad,
            });
            console.log("Mostrando Pop up.");
            setPopupds(true);
        }
    }

    const handleEnviado = () => {
        setPopupds(false);
        setShowAdvise(true);
    }
/*
    const handleEnviarClick = async () => {
        if (asunto === '' || descripcion === '' || address === '' || latitud === '' || longitud === '' || municipalidad === '') {
            setShowAlert(true);
        } else {
            setSending(true); // Mostrar indicador de carga al enviar
            try {
                const queja = {
                    asunto: asunto,
                    descripcion: descripcion,
                    foto: selectedImage,
                    ubicacion_descripcion: address,
                    latitud: latitud,
                    longitud: longitud,
                    municipalidad: municipalidad,
                };
                const resp = await quejaApi.agregarQueja(queja);
                console.log("Queja guardada.");
                setShowAdvise(true);
            } catch (error) {
                alert("Error al guardar.");
                console.error("Error en el registro de queja:", error);
            } finally {
                setSending(false); // Ocultar indicador de carga al enviar
            }
        }
    };*/

    const handleChange = (e) => {
        const selectedMunicipalidad = municipalidades.find(muni => muni.id === parseInt(e.target.value, 10));
        setMunicipalidad(selectedMunicipalidad.id);
    };

    const removeBarraBaja = (text) => {
        let formattedText = text.replace(/_/g, ' ');
        formattedText = formattedText.replace(/%C3%B3/g, 'ó');
        formattedText = formattedText.replace(/%C3%BA/g, 'ú');
        formattedText = formattedText.replace(/%C3%81/g, 'Á');
        formattedText = formattedText.replace(/%C3%AD/g, 'í');
        return formattedText;
    };

    useEffect(() => {
        const formattedType = removeBarraBaja(type);
        setAsunto(formattedType);

        const fetchMunicipalidades = async () => {
            try {
                const response = await municipalidadApi.findAll();
                setMunicipalidades(response.data);
            } catch (error) {
                console.error('Error al obtener las municipalidades:', error);
            } finally {
                setLoading(false); // Ocultar indicador de carga inicial
            }
        };

        fetchMunicipalidades();
    }, [type]);

    useEffect(() => {
        setIsButtonDisabled(!(asunto,latitud,longitud,municipalidad));
    }, [asunto,latitud,longitud,municipalidad]);

    useEffect(() => {
        for (let i = 0; i < municipalidades.length; i++) {
            if (address.includes(municipalidades[i]?.nombre)) {
                setMunicipalidad(parseInt(municipalidades[i].id, 10));
                break;
            }
        }
    }, [markerPosition, address, municipalidades]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Layout>
            <div>
                {type !== "Otros" ? (
                    <div className='p-4 mb-4 border-b border-black font-semibold text-2xl'>
                        {removeBarraBaja(type)}
                    </div>
                ) : (
                    <>
                        <div className='p-4 mb-4 border-b border-black font-semibold text-2xl'>
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
                    Elige el lugar donde se encuentra el inconveniente:
                </div>
                <div>
                    <SearchBox onPlaceSelected={onPlaceSelected} address={address} setAddress={setAddress} />
                </div>
                <div className='pt-4 pb-4'>
                    <MapComponent
                        onMapLoad={onMapLoad}
                        mapRef={mapRef}
                        markerPosition={markerPosition}
                        onMarkerDragEnd={onMarkerDragEnd}
                    />
                </div>
                <div className='pt-4 pb-4'>
                    Seleccione la municipalidad destino:
                </div>
                <div>
                    <Box sx={{ minWidth: 500 }}>
                        <FormControl fullWidth>
                            <InputLabel id="municipalidad-label"></InputLabel>
                            <Select
                                labelId="municipalidad-label"
                                value={municipalidad}
                                onChange={handleChange}
                                sx={{ width: '90%' }}
                            >
                                {municipalidades.map((muni) => (
                                    <MenuItem key={muni.id} value={muni.id}>
                                        {muni.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className='mt-4'>
                    <button className='rounded-2xl text-white bg-inLima_red p-4 pl-8 pr-8' onClick={handleContinueClick} disabled={isButtonDisabled} title={isButtonDisabled ? "Complete todos los datos" : ""}>
                        {sending ? <CircularProgress size={24} /> : "Enviar"}
                    </button>
                </div>
                {showAdvise && (
                    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                        <Advise Mensaje="Se envió satisfactoriamente" URL="/estado"/>
                    </div>
                )}
                {showAlert && (
                    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                        <Advise Mensaje="Faltan datos a completar" onClose={() => setShowAlert(false)}/>
                    </div>
                )}
                {popupds && (
                    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                        <Description informacion={informacion} onClose={() => setPopupds(false)} enviado={() => handleEnviado()}/>
                    </div>
                )}
            </div>
        </Layout>
    )
}
export default Page;