'use client'
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import NoSsr from '@mui/material/NoSsr';
import CameraIcon from '@/icons/camera';
import Advise from '@/components/Advise';
import Layout from '@/components/Layout';

async function page({ params }) {

    const { type } = params;
    const [showAdvise, setShowAdvise] = useState(false);

    const [asunto, setAsunto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [nombreFoto, setNombreFoto] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [ubicacion, setUbicacion] = useState("");
    const [latitud, setLatutid] = useState(0.0);
    const [longitud, setLongitud] = useState(0.0);
    const [municipalidad, setMunicipalidad] = useState(0);

    const handleEnviarClick = () => {
        setShowAdvise(true);
    };

    const handleSubirFoto = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setNombreFoto(file.name)
        }
    };

    const handleEliminarFoto = () => {
        setSelectedImage(null);
        setNombreArchivo("");
    };

    const removeBarraBaja = (text) => {
        var formattedText = text.replace(/_/g, ' ');
        formattedText = formattedText.replace(/%C3%B3/g, 'ó')
        formattedText = formattedText.replace(/%C3%BA/g, 'ú')
        formattedText = formattedText.replace(/%C3%81/g, 'Á')
        formattedText = formattedText.replace(/%C3%AD/g, 'í')
        return formattedText;
    };

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
                                    onChange={setAsunto}
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
                        maxRows={4} // Puedes ajustar esto según lo que necesites
                        fullWidth
                        variant="outlined"
                        onChange={setDescripcion}
                        sx={{ width: '90%' }}
                    />
                </NoSsr>
                <div className='pt-4 pb-4'>
                    Elige el lugar donde se encuentra el inconveniente:
                </div>
                <div>
                    <NoSsr>
                        <TextField
                            onChange={setUbicacion}
                            sx={{ width: '90%' }}
                        />
                    </NoSsr>
                </div>
                <div className='pt-4 pb-4'>
                    Seleccione la municipalidad destino:
                </div>
                <div>
                    <NoSsr>
                        <TextField
                            onChange={setUbicacion}
                            sx={{ width: '90%' }}
                        />
                    </NoSsr>
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
                    {/* Botón de la cámara */}
                    <label htmlFor="upload-photo" style={{cursor: 'pointer'}}>
                        <CameraIcon className='bg-gray-300 rounded-lg pl-3 pr-3'/>
                    </label>
                    
                    {nombreFoto !== "" ? (
                    <div className='center'>
                        {nombreFoto}
                        <button className='rounded-2xl bg-gray-300 ml-2 mr-2 p-2' onClick={handleEliminarFoto} style={{cursor: 'pointer'}}>
                            No adjuntar
                        </button>
                    </div>
                    ):(<></>)}
                </div>
                <div className='mt-4'>
                    <button className='rounded-2xl text-white bg-inLima_red p-4 pl-8 pr-8' onClick={handleEnviarClick}>
                        Enviar
                    </button>
                </div>
                {showAdvise && (
                    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                        <Advise Mensaje="Se envió satisfactoriamente" />
                    </div>
                )}
            </div>
        </Layout>
    )

}
export default page