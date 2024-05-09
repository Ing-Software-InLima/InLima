"use client";
import './css/gestion.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function GestionPage() {

    const [asuntosSeleccionados, setAsuntosSeleccionados] = useState([]);
    const [ubicacion, setUbicacion] = useState('');
    const router = useRouter();

    const handleSeleccionarTodos = () => {
        // Obtener todos los asuntos disponibles y establecerlos como seleccionados
        const todosLosAsuntos = ["Veredas rotas", "Calles contaminadas", "Poste de luces apagadas", "Construcción sin licencia", "Comercio ilegal", "Invasión no autorizada de lugares públicos", "Árboles obstruyen la circulación", "Vehículo abandonado", "Mascota perdida", "Inmueble abandonado", "Propiedad en mal estado"];
        setAsuntosSeleccionados(todosLosAsuntos);
    };

    const handleChange = (event) => {
        setUbicacion(event.target.value);
    };

    const handleSearch = (e) => {
        // Construye la URL de búsqueda con los parámetros de asunto y ubicación
        const queryParams = new URLSearchParams({ asuntos: asuntosSeleccionados.join(','), ubicacion }).toString();
        // Redirige a la página de resultados con los parámetros de búsqueda
        router.push(`/resultados?${queryParams}`);
    };

    return (
        <>
            <div id="form">
                <div className="border-b border-gray-300" id="titulo">
                    <p className="pb-2"> Busqueda</p>
                </div>
                <div className=" py-4 px-4 ">
                    <form className="flex" onSubmit={(e) => { e.preventDefault() }}>
                        <div className="mr-4 space-y-4 m-3 ">
                            <div>
                                <Autocomplete
                                    multiple
                                    id="asuntos-autocomplete"
                                    options={["Seleccionar todos", "Veredas rotas", "Calles contaminadas", "Poste de luces apagadas",
                                        "Construcción sin licencia", "Comercio ilegal", "Invasión no autorizada de lugares públicos",
                                        "Árboles obstruyen la circulación", "Vehículo abandonado", "Mascota perdida", "Inmueble abandonado",
                                        "Propiedad en mal estado"]}
                                    onChange={(event, newValue) => {
                                        if (newValue.includes("Seleccionar todos")) {
                                            handleSeleccionarTodos();
                                        } else {
                                            setAsuntosSeleccionados(newValue);
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" label="Seleccionar Asuntos" placeholder="Asuntos" sx={{ '& .MuiOutlinedInput-root': { borderColor: 'inLima_red !important' } }} />
                                    )}
                                />

                            </div>


                            <div>
                                <Box sx={{ minWidth: 500 }}>
                                    <FormControl fullWidth>
                                    <InputLabel id="ubicacion-label">Seleccionar Ubicación</InputLabel>
                                        <Select
                                        labelId="ubicacion-label"
                                        value={ubicacion}
                                        onChange={handleChange}
                                        label="Seleccionar Ubicación"
                                        >
                                            <MenuItem value={"ate"}>ate</MenuItem>
                                            <MenuItem value={"ahsdha"}>san isidro</MenuItem>
                                            <MenuItem value={"sasda"}>Miraflores</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>

                            {/*
                                <div id="text_field">
                                <div class="borde_text_field">
                                    <div class="state_layer">
                                        <div class="content">
                                            <div id="text_type">
                                                <p>Ingrese Ubicación</p>
                                            </div>
                                            <div id="input_text">
                                                <input type='text' placeholder='' id="input_text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
                                                            </div>
                                                        </div>
                                            </div>
                                        </div>

                                        <div class="supporting-text">
                                        <p></p>
                                    </div>

                                </div>*/}

                            <div className="text-left space-x-2 ">
                                <button type="submit" onClick={handleSearch} className="bg-inLima_beige px-4 py-2 hover:bg-inLima_red hover:text-white border rounded-full text-inLima_red  py-1">Buscar</button>
                            </div>



                        </div>

                    </form>

                </div>

            </div>

        </>

    )
}