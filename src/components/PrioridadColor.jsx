export default function PrioridadColor({estado}){
    const color =
    estado == 1 ? ("bg-slate-600") : 
    estado == 2 ? ("bg-yellow-300") : 
    ("bg-red-600")

    const nombre =
    estado == 3 ? ("Baja") : 
    estado == 2 ? ("Media") : 
    ("Alta")

    return(
        <div className={`bg-gree w-auto h-auto py-1 px-2 rounded-lg text-center text-white ${color}`}>
            {nombre}
      </div>
    )
}