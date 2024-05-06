import './css/gestion.css';
{/*
import { useClient } from 'next/dist/shared/lib/router-context'; // Importa useClient
import { useSearchParams } from 'next/navigation'; // Cambia la importación a next/navigation
import { useState } from 'react';
import { useRouter } from 'next/router';*/ }

export default function GestionPage() {
    {/*
    useClient(); // Marca el componente padre como Client Component

    const searchParams = useSearchParams();
    const router = useRouter()

    // Parametros de busqueda
    const [AsuntoQueja, setAsuntoQueja] = useState("");
    const [Ubicacion, setUbicacion] = useState("");


    const handleSearch = async (e) => {
        // escribe en la URL visualmente
        const params = new URLSearchParams(searchParams);
        params.set('asunto', AsuntoQueja);
        params.set('ubicacion', Ubicacion);
        console.log(params.toString())
        //router.push(`/resultados?${params.toString()}`)
    };*/ }

    return (
        <>
            <div id="form">
                    <div className="border-b border-gray-300" id="titulo">
                        <p className="pb-2"> Busqueda</p>
                    </div>
                    <div className=" py-4 px-4 ">
                        <form className="flex" //onSubmit={(e) => { e.preventDefault() }}
                        >
                            <div className="w-1/2 mr-4 space-y-4 m-3 ">

                                <div id="text_field">
                                    <div class="borde_text_field">
                                        <div class="state_layer">
                                            <div class="content">
                                                <div id="text_type">
                                                    <p>Ingresa el asunto de la queja</p>
                                                </div>
                                                <div id="input_text">
                                                    <input type='text' placeholder='' id="inputAsunto" //value={AsuntoQueja} onChange={(e) => setAsuntoQueja(e.target.value)} 
                                                    />
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
                                                    <input type='text' placeholder='' id="inputUbi" //value={Ubicacion} onChange={(e) => setUbicacion(e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="supporting-text">
                                        <p></p>
                                    </div>

                                </div>

                            </div>


                            <div className="w-1/2">
                                <div className="mb-4">

                                    <div className="space-y-2">

                                    </div>
                                </div>
                            </div>
                            <div className="text-right space-x-2 ">
                                <button type="reset" className="px-4 py-2 hover:text-inLima_red border rounded-full py-1">Limpiar</button>
                                <button type="submit" //onClick={handleSearch} 
                                    className="bg-inLima_beige px-4 py-2 hover:bg-inLima_red border rounded-full text-white py-1" >Buscar</button>
                            </div>

                        </form>

                    </div>

            </div>

        </>

    )
}