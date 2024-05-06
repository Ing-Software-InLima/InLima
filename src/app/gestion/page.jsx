import './css/1.css';
import { useState } from "react"
import Input from '@mui/material/Input';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

export default function GestionPage() {


    const [cuenta, setCuenta] = useMiProvider()

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
        router.push(`/resultados?${params.toString()}`)
    };

    return (
        <>
            <div id="form">

                <div class="bg-white p-6 rounded-md shadow-md w-12/12 h-full">
                    <div class="flex justify-between gap-4 mb-4">
                        <h1 class="text-2xl font-semibold">Búsqueda</h1>
                        {cuenta.tipo == 'admin' && (
                            <Link type="button" href="/agregarLibroAdm" class="px-4 py-2 hover:bg-blue-600 border rounded-full color_fondo_primario color_letra_blanco">Agregar un nuevo recurso</Link>
                        )}
                    </div>
                    <div class=" py-4 px-4 color_fondo_secundario">
                        <form class="flex" onSubmit={(e) => { e.preventDefault() }}>

                            <div class="w-1/2 mr-4 space-y-4 m-3 ">

                                <div id="text_field">
                                    <div class="borde_text_field">
                                        <div class="state_layer">
                                            <div class="content">
                                                <div id="text_type">
                                                    <p>Ingresa el asunto de la queja</p>
                                                </div>
                                                <div id="input_text">
                                                    <input type='text' placeholder='' id="inputAsunto" value={AsuntoQueja} onChange={(e) => setAsuntoQueja(e.target.value)} />
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
                                                    <input type='text' placeholder='' id="inputUbi" value={Ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="supporting-text">
                                        <p></p>
                                    </div>

                                </div>

                            </div>


                            <div class="w-1/2">
                                <div class="mb-4">

                                    <div class="space-y-2">
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="text-right space-x-2 ">
                                <button type="reset" class="bg-purple-bg text-purple-primary px-4 py-2 hover:bg-blue-600 border rounded-full color_letra_primario">Limpiar</button>
                                <button type="submit" onClick={handleSearch} class="bg-purple-primary text-purple-bg px-4 py-2 hover:bg-blue-600 border rounded-full color_fondo_primario color_letra_blanco" >Buscar</button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </>

    )
}