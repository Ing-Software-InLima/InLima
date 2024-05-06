"use client";
import { useRouter } from 'next/navigation';



export default function MenuPage() {
    const router = useRouter();

    const handleClick = (asunto) => {
        router.push(`/complaint?asunto=${encodeURIComponent(asunto)}`);
    };

    return (
        <>
            <p className="mt-2 text-lg font-normal" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '22px' }}>Cuentanos tus inquietudes</p>
            <img src="/divider.svg" alt="divider"   className="mt-3"/>

            <div className="flex" style={{ marginTop: '80px', marginLeft: '90.11px' }}>
                <button onClick={() => handleClick('Veredas rotas')} className="relative" style={{ height: '170px', width: '123.95px', marginRight: '120px' }}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/veredaRota.svg" alt="VeredaRota" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "5%", textAlign: 'center' }}>Veredas rotas</p>
                </button>
                <button onClick={() => handleClick('Calles contaminadas')} className="relative " style={{ height: '170px', width: '123.95px', marginRight: '120px' }}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/callesContaminadas.svg" alt="callesContaminadas" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Calles contaminadas</p>
                </button>
                <button onClick={() => handleClick('Poste de luces apagadas')} className="relative " style={{ height: '170px', width: '123.95px', marginRight: '120px' }}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/posteLuces.svg" alt="posteLuces" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Poste de luces apagadas</p>
                </button>
                <button onClick={() => handleClick('Construcción sin licencia')} className="relative " style={{ height: '170px', width: '123.95px', marginRight: '120px' }}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/construcSLicencia.svg" alt="construcSLicencia" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Construcción sin licencia</p>
                </button>
                <button onClick={() => handleClick('Comercio ilegal')} className="relative " style={{ height: '170px', width: '123.95px', marginRight: '120px' }}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/comercioIlegal.svg" alt="comercioIlegal" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "5%", textAlign: 'center' }}>Comercio ilegal</p>
                </button>
                <button onClick={() => handleClick('Invasión no autorizada de lugares públicos')} className="relative " style={{ height: '170px', width: '123.95px' }}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/invasionNoAuto.svg" alt="invasionNoAuto" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-25%", textAlign: 'center' }}>Invasión no autorizada de lugares públicos</p>
                </button>
            </div>
            <div className="flex" style={{ marginTop: '100px', marginLeft: '90.11px' }}>
                <button onClick={() => handleClick('Árboles obstruyen la circulación')} className="relative " style={{ height: '170px', width: '123.95px',  marginRight: '120px'}}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/arbolesOCircula.svg" alt="arbolesOCircula" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-25%", textAlign: 'center' }}>Árboles obstruyen la circulación</p>
                </button>
                <button onClick={() => handleClick('Vehiculo abandonado')} className="relative " style={{ height: '170px', width: '123.95px',  marginRight: '120px'}}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/vehiculoAban.svg" alt="vehiculoAban" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Vehiculo abandonado</p>
                </button>
                <button onClick={() => handleClick('Mascota perdida')} className="relative " style={{ height: '170px', width: '123.95px',  marginRight: '120px'}}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/mascotaPer.svg" alt="mascotaPer" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Mascota perdida</p>
                </button>
                <button onClick={() => handleClick('Inmueble abandonado')} className="relative " style={{ height: '170px', width: '123.95px',  marginRight: '120px'}}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/inmuebleAban.svg" alt="inmuebleAban" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Inmueble abandonado</p>
                </button>
                <button onClick={() => handleClick('Propiedad en mal estado')} className="relative " style={{ height: '170px', width: '123.95px',  marginRight: '120px'}}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/propiedadMEs.svg" alt="propiedadMEs" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Propiedad en mal estado</p>
                </button>
                <button  onClick={() => handleClick('/complaint2')} className="relative " style={{ height: '170px', width: '123.95px',  marginRight: '120px'}}>
                    <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                    <img src="/otros.svg" alt="otros" className=" inset-0 " style={{ position: 'relative', height: '120px', width: '120px', left: '51%', top: '21%', transform: 'translate(-50%, -50%)' }} />
                    <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "5%", textAlign: 'center' }}>Otros</p>
                </button>
            </div>
        </>

    );
}
