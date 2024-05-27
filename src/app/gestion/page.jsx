"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Layout from '@/components/Layout';
import municipalidadApi from '@/api/municipalidad';

export default function GestionPage() {
    const [asuntosSeleccionados, setAsuntosSeleccionados] = useState([]);
    const [municipalidad, setMunicipalidad] = useState(null); // Cambia el estado a null inicialmente
    const [municipalidades, setMunicipalidades] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchMunicipalidades = async () => {
            try {
                const response = await municipalidadApi.findAll();
                setMunicipalidades(response.data);
            } catch (error) {
                console.error('Error al obtener las municipalidades:', error);
            }
        };

        fetchMunicipalidades();
    }, []);

    const handleSeleccionarTodos = () => {
        const todosLosAsuntos = ["Veredas rotas", "Calles contaminadas", "Poste de luces apagadas", "Construcción sin licencia", "Comercio ilegal", "Invasión no autorizada de lugares públicos", "Árboles obstruyen la circulación", "Vehículo abandonado", "Mascota perdida", "Inmueble abandonado", "Propiedad en mal estado"];
        setAsuntosSeleccionados(todosLosAsuntos);
    };

    const handleChange = (e) => {
        const selectedMunicipalidad = municipalidades.find(muni => muni.id === parseInt(e.target.value, 10));
        setMunicipalidad(selectedMunicipalidad);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({
            asuntos: asuntosSeleccionados.join(','),
            municipalidad: municipalidad ? municipalidad.id : ''
        }).toString();
        console.log("Asuntos seleccionados:", asuntosSeleccionados);
        console.log("Municipalidad seleccionada:", municipalidad);
        console.log("Query Params:", queryParams);
        router.push(`/resultados?${queryParams}`);
    };

    return (
        <Layout>
            <div className="flex flex-col w-[1088px] h-[510px] flex-shrink-0 bg-transparent">
                <div className="border-b border-gray-300" id="titulo">
                    <p className="pb-2">Busqueda</p>
                </div>
                <div className="py-4 px-4">
                    <form className="flex" onSubmit={handleSearch}>
                        <div className="mr-4 space-y-4 m-3">
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
                                            value={municipalidad ? municipalidad.id : ''}
                                            onChange={handleChange}
                                            label="Seleccionar Ubicación"
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

                            <div className="text-left space-x-2">
                                <button type="submit" className="bg-inLima_beige px-4 py-2 hover:bg-inLima_red hover:text-white border rounded-full text-inLima_red">Buscar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
