import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Advise(props) {
    const { Mensaje, URL, onClose } = props;
    const router = useRouter();
    const [calificacion, setCalificacion] = useState(null);
    const handleClick = () => {
        if (URL) {
            router.push(URL);
        } else if (calificacion) {
            onClose(calificacion);
        } else {
            router.back();
        }
    };

    return (
        <div className="rounded-2xl bg-inLima_beige w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mx-auto my-16 md:my-24 text-center">
            <div className="pt-6 pb-8 font-bold text-2xl">CALIFICA ESTA QUEJA</div>
            <div className="py-0 font-light">¿Cuanto crees que aportó esta queja?</div>
            <div className='flex justify-center gap-4 pb-12 pt-5'>
                
                {[...Array(5)].map((star, i) => {
                    return (
                        <label>
                            <input type="radio" name="rating" className='hidden' value={i + 1} onClick={()=> setCalificacion(i+1)} />
                            <Image src={'/star.png'} width={50} height={30} className={`${(i+1 > calificacion) && 'grayscale'} cursor-pointer`}></Image>
                        </label>
                    )                    
                })}
            </div>

            <div>
                <button className="disabled:opacity-65 rounded-lg text-white bg-inLima_red p-4 px-8 mb-2 hover:bg-inLima_darkRed transition-colors duration-300" disabled={calificacion == null} onClick={handleClick}>
                    Continuar
                </button>
            </div>
        </div>
    );
}
