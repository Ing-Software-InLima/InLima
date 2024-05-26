"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Layout from '@/components/Layout';

export default function GestionPage() {

    

    const [asuntosSeleccionados, setAsuntosSeleccionados] = useState([]);
    const [municipalidad, setMunicipalidad] = useState('');
    const router = useRouter();

    const handleSeleccionarTodos = () => {
        // Obtener todos los asuntos disponibles y establecerlos como seleccionados
        const todosLosAsuntos = ["Veredas rotas", "Calles contaminadas", "Poste de luces apagadas", "Construcción sin licencia", "Comercio ilegal", "Invasión no autorizada de lugares públicos", "Árboles obstruyen la circulación", "Vehículo abandonado", "Mascota perdida", "Inmueble abandonado", "Propiedad en mal estado"];
        setAsuntosSeleccionados(todosLosAsuntos);
    };

    const handleChange = (e) => {
        setMunicipalidad(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Construye la URL de búsqueda con los parámetros de asunto y ubicación
        const queryParams = new URLSearchParams({ asuntos: asuntosSeleccionados.join(','), municipalidad }).toString();
        // Redirige a la página de resultados con los parámetros de búsqueda
        console.log("Asuntos seleccionados:", asuntosSeleccionados);
        console.log("Municipalidad seleccionada:", municipalidad);
        console.log("Query Params:", queryParams);
        router.push(`/resultados?${queryParams}`);
    };

    return (
        <Layout>
            <div class="flex flex-col w-[1088px] h-[510px] flex-shrink-0 bg-transparent">
                <div className="border-b border-gray-300" id="titulo">
                    <p className="pb-2"> Busqueda</p>
                </div>
                <div className=" py-4 px-4 ">
                    <form className="flex" onSubmit={handleSearch}>
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
                                            setAsuntosSeleccionados(newValue.filter(option => option !== "Seleccionar todos"));
                                        }
                                    }}
                                    value={asuntosSeleccionados}
                                    renderInput={(params) => (
                                        <TextField {...params} 
                                        variant="outlined" 
                                        label="Seleccionar Asuntos"
                                         placeholder="Asuntos" 
                                         sx={{ '& .MuiOutlinedInput-root': { borderColor: 'inLima_red !important' } }} />
                                    )}
                                />

                            </div>


                            <div>
                                <Box sx={{ minWidth: 500 }}>
                                    <FormControl fullWidth>
                                    <InputLabel id="municipalidad-label">Seleccionar Ubicación</InputLabel>
                                        <Select
                                        labelId="municipalidad-label"
                                        value={municipalidad}
                                        onChange={handleChange}
                                        label="Seleccionar Ubicación"
                                        >
                                            <MenuItem value={"Ate"}>Ate</MenuItem>
                                            <MenuItem value={"San isidro"}>San isidro</MenuItem>
                                            <MenuItem value={"Miraflores"}>Miraflores</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>

                            <div className="text-left space-x-2 ">
                                <button type="submit" className="bg-inLima_beige px-4 py-2 hover:bg-inLima_red hover:text-white border rounded-full text-inLima_red  py-1">Buscar</button>
                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>

    )
}