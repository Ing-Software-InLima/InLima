"use client";
import './css/gestion.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GestionPage() {

    const [asunto, setAsunto] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const router = useRouter();

    const handleLimpiar = () => {
        // Limpiar los valores de los campos de entrada
        setAsunto('');
        setUbicacion('');
    };

    const handleSearch = (e) => {
        // Construye la URL de búsqueda con los parámetros de asunto y ubicación
        const queryParams = new URLSearchParams({ asunto, ubicacion }).toString();
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
                    <form className="flex"  onSubmit={(e)=>{e.preventDefault()}}>
                        <div className="mr-4 space-y-4 m-3 ">

                            <div id="text_field">
                                <div class="borde_text_field">
                                    <div class="state_layer">
                                        <div class="content">
                                            <div id="text_type">
                                                <p>Ingresa el asunto de la queja</p>
                                            </div>
                                            <div id="input_text">
                                                <input type='text' placeholder='' id="input_text" value={asunto} onChange={(e) => setAsunto(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="supporting-text">
                                    <p></p>
                                </div>

                            </div>

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

                                </div>

                                <div className="text-left space-x-2 ">
                                    <button type="reset" onClick={handleLimpiar} className="px-4 py-2 hover:text-inLima_red border rounded-full py-1">Limpiar</button>
                                    <button type="submit" onClick={handleSearch} className="bg-inLima_beige px-4 py-2 hover:bg-inLima_red hover:text-white border rounded-full text-inLima_red  py-1">Buscar</button>
                                </div>

                            </div>
                                
                        </form>

                    </div>

                </div>

            </>

        )
    }