
export default function MenuPage() {
    return (
        <>
            
            <p className="mt-2 text-lg font-normal" style={{ fontFamily: 'Roboto, sans-serif' , fontSize: '22px'}}>Cuentanos tus inquietudes</p>

            <div className="absolute inset-0 flex " style={{ position: 'sticky',height: '550px'}}>
                <div className="relative " style={{ height: '123.95px', width: '123.95px',top: '10%', left: '5%' }}>
                        <img src="/circulo.svg" alt="Circulo" className="absolute inset-0 w-full h-full" style={{ height: '123.95px', width: '123.95px' }}/>
                        <img src="/veredaRota.svg" alt="VeredaRota" className=" inset-0 " style={{ position: 'relative', height: '79.02px', width: '89.86px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
                </div>
            </div>

        </>

    );
}
