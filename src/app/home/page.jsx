
import Link from "next/link";
export default function MenuPage() {

    return (
        <>
            <p className="mt-2 text-lg font-normal" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '22px' }}>Cuentanos tus inquietudes</p>
            <img src="/divider.svg" alt="divider"   className="mt-3"/>

            <div className="flex" style={{ marginTop: '80px', marginLeft: '90.11px' }}>
                <Link href="/complaint/[type]" as="/complaint/Veredas_rotas">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/veredaRota.svg" alt="VeredaRota" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "5%", textAlign: 'center' }}>Veredas rotas</p>
                    </div>
                </Link>
                <Link href="/complaint/[type]" as="/complaint/Calles_contaminadas">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/callesContaminadas.svg" alt="callesContaminadas" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Calles contaminadas</p>
                    </div>
                </Link>
                <Link href="/complaint/[type]" as="/complaint/Poste_de_luces_apagadas">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/posteLuces.svg" alt="posteLuces" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Poste de luces apagadas</p>
                    </div>
                </Link>
                <Link href="/complaint/[type]" as="/complaint/Construcción_sin_licencia">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/construcSLicencia.svg" alt="construcSLicencia" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Construcción sin licencia</p>
                    </div>
                </Link>
                <Link href="/complaint/[type]" as="/complaint/Comercio_ilegal">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/comercioIlegal.svg" alt="comercioIlegal" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "5%", textAlign: 'center' }}>Comercio ilegal</p>
                    </div>
                </Link>
                <Link href="/complaint/[type]" as="/complaint/Invasión_no_autorizada_de_lugares_públicos">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/invasionNoAuto.svg" alt="invasionNoAuto" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-25%", textAlign: 'center' }}>Invasión no autorizada de lugares públicos</p>
                    </div>
                </Link>
                
            </div>
            <div className="flex" style={{ marginTop: '100px', marginLeft: '90.11px' }}>
                <Link href="/complaint/[type]" as="/complaint/Árboles_obstruyen_la_circulación">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/arbolesOCircula.svg" alt="arbolesOCircula" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-25%", textAlign: 'center' }}>Árboles obstruyen la circulación</p>
                    </div>
                </Link>
                <Link href="/complaint/[type]" as="/complaint/Vehículo_abandonado">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/vehiculoAban.svg" alt="vehiculoAban" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Vehículo abandonado</p>
                    </div>
                </Link>
                <Link href="/complaint/[type]" as="/complaint/Mascota_perdida">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/mascotaPer.svg" alt="mascotaPer" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Mascota perdida</p>
                    </div>
                </Link>
                <Link href="/complaint/[type]" as="/complaint/Inmueble_abandonado">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/inmuebleAban.svg" alt="inmuebleAban" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Inmueble abandonado</p>
                    </div>
                </Link>
                <Link href="/complaint/[type]" as="/complaint/Propiedad_en_mal_estado">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/propiedadMEs.svg" alt="propiedadMEs" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "-10%", textAlign: 'center' }}>Propiedad en mal estado</p>
                    </div>
                </Link>
                <Link href="/complaint/[type]" as="/complaint/Otros">
                    <div className="relative" style={{ height: '170px', width: '123.95px', marginRight: '90px' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }} />
                        <img src="/otros.svg" alt="otros" className="inset-0" style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }} />
                        <p className="font-normal absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: "123.95px", bottom: "5%", textAlign: 'center' }}>Otros</p>
                    </div>
                </Link>
                
            </div>
            
        </>

    );
}

