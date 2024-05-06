export default function GestionPage(){
    return (
            <>
                <h1 className="w-full text-black text-2xl font-serif font-normal leading-7 break-words">
                Busqueda
                </h1>
                
                <div className="flex flex-col w-1088 h-510 flex-shrink-0 bg-secondary mt-20">

                    

                    <div class="bg-white p-6 rounded-md shadow-md w-12/12 h-full">
                        <div class="flex justify-between gap-4 mb-4">
                            <h1 class="text-2xl font-semibold">Búsqueda</h1>
                        </div>
                        <div class=" py-4 px-4 color_fondo_secundario">
                            <form class="flex" //</div>onSubmit={(e)=>{e.preventDefault()}}
                            >
                                <div class="w-1/2 mr-4 space-y-4 m-3 ">

                                    <div className="flex flex-col w-291 items-start rounded-tl-4 rounded-tr-4 ml-0 mr-auto mt-35">
                                        <div className="flex flex-col items-start gap-10 self-stretch border-2 border-primary rounded-4">
                                            <div className="flex py-2 px-4 self-stretch items-center rounded-tl-4 rounded-tr-4">
                                                <div className="flex h-40 relative flex-col justify-center items-start flex-1">
                                                    <div className="rounded-5 flex px-4 items-center absolute bg-white text-primary font-sans text-xs font-normal h-20">
                                                        <p>Ingresa el asunto de la queja</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input type='text' placeholder='' id="inputAsunto" //value={palabraclave} onChange={(e) => setPalabraclave(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex py-10 px-16 self-stretch items-start gap-10 w-full">
                                            <p></p>
                                        </div>

                                    </div>

                                    <div className="flex flex-col w-291 items-start rounded-tl-4 rounded-tr-4 ml-0 mr-auto mt-35">
                                        <div className="flex flex-col items-start gap-10 self-stretch border-2 border-primary rounded-4">
                                            <div className="flex py-2 px-4 self-stretch items-center rounded-tl-4 rounded-tr-4">
                                                <div className="flex h-40 relative flex-col justify-center items-start flex-1">
                                                    <div className="rounded-5 flex px-4 items-center absolute bg-white text-primary font-sans text-xs font-normal h-20">
                                                        <p>Ingresa el asunto de la queja</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input type='text' placeholder='' id="inputAsunto" //value={palabraclave} onChange={(e) => setPalabraclave(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex py-10 px-16 self-stretch items-start gap-10 w-full">
                                            <p></p>
                                        </div>

                                    </div>

                                </div>

                                <div class="text-right space-x-2 ">
                                    <button type="reset" class="bg-purple-bg text-purple-primary px-4 py-2 hover:bg-blue-600 border rounded-full color_letra_primario">Limpiar</button>
                                    <button type="submit" /*onClick={handleSearch} */ class="bg-purple-primary text-purple-bg px-4 py-2 hover:bg-blue-600 border rounded-full color_fondo_primario color_letra_blanco" >Buscar</button>
                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </>
        
    )
}