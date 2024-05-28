import { useRouter } from 'next/navigation';

export default function Advise(props) {
    const mensaje = props.Mensaje;
    const url = props.URL;
    const router = useRouter();
    const handleClick = () => {
        router.push(url)
      };
    return (
        <div className="rounded-2xl bg-inLima_beige w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mx-auto my-16 md:my-24 text-center">
            <div className="py-8">{mensaje}</div>
            <div>
                <button className="rounded-lg text-white bg-inLima_red p-4 pl-8 pr-8 hover:bg-inLima_darkRed transition-colors duration-300" onClick={handleClick}>
                    Continuar
                </button>
            </div>
        </div>
    );
}
