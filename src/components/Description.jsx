import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import NoSsr from '@mui/material/NoSsr';
import quejaApi from '@/api/queja';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function Description(props) {
    const { informacion, enviado, onClose } = props;
    const [nombreFoto, setNombreFoto] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [wordCount, setWordCount] = useState(0);

    const handleCancelar = () => {
        onClose();
    };

    const fileInputRef = useRef(null);

    const handleEnviar = async () => {
        if (descripcion === '') {
            setShowAlert(true);
        } else {
            try {
                const queja = {
                    ...informacion,
                    descripcion: descripcion,
                    foto: selectedImage,
                };
                const resp = await quejaApi.agregarQueja(queja);
                console.log("Queja guardada.");
                enviado();
            } catch (error) {
                alert("Error al guardar.");
                console.error("Error en el registro de queja:", error);
            }
        }
    };

    const handleSubirFoto = (e) => {
        const file = e.target.files[0];
        setNombreFoto(file.name);
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEliminarFoto = () => {
        setSelectedImage('');
        setNombreFoto("");
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDescripcionChange = (e) => {
        const inputText = e.target.value;
        const words = inputText.split(/\s+/);
        const wordsFiltered = words.filter(word => word.length > 0);
        if (wordsFiltered.length <= 200) {
            setDescripcion(inputText);
            setWordCount(wordsFiltered.length);
        }
    };

    return (
        <div className="rounded-2xl bg-white w-full max-w-lg p-8 mx-auto my-16 md:my-24">
            <div className= 'pb-4'>
                Detalle de su inquietud en este apartado: (Máximo 200 palabras)
            </div>
            <NoSsr>
                <TextField
                    id="detalle"
                    multiline
                    maxRows={10}
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={descripcion}
                    spellCheck={false}
                    onChange={handleDescripcionChange}
                    sx={{ width: '100%' }}
                    className="min-w-0"
                />
                <p className="text-right">{wordCount}/200 palabras</p>
            </NoSsr>
            <div className='pt-4 pb-4'>
                Adjuntar fotos (No es obligatorio)
            </div>
            <div>
                <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleSubirFoto}
                    style={{ display: 'none' }}
                    id="upload-photo"
                    ref={fileInputRef}
                />
                <Button
                    htmlFor='upload-photo'
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    className='bg-gray-300 hover:bg-inLima_red'
                    startIcon={<CloudUploadIcon />}
                >
                    Subir foto
                </Button>

                {nombreFoto !== "" ? (
                    <div className='center'>
                        {nombreFoto}
                        <button className='rounded-2xl bg-gray-300 ml-2 mr-2 p-2' onClick={handleEliminarFoto} style={{ cursor: 'pointer' }}>
                            No adjuntar
                        </button>
                    </div>
                ) : (<></>)}
            </div>

            <Stack direction="row" spacing={2} className='pt-4'>
                <Button variant="outlined" onClick={handleCancelar}>
                    Cancelar
                </Button>
                <Button variant="contained" endIcon={<SendIcon />} className='bg-inLima_red hover:bg-gray-300' onClick={handleEnviar}>
                    Enviar
                </Button>
            </Stack>
        </div>
    );
}
