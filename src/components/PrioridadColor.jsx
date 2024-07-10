export default function PrioridadColor({estado}){
    const color =
    estado == 1 ? ("bg-slate-600") : 
    estado == 2 ? ("bg-yellow-300") :
    estado == 3 ? ("bg-red-600"): ("bg-neutral-700")
    

    const nombre =
    estado == 1 ? ("Baja") : 
    estado == 2 ? ("Media") : 
    estado == 3 ? ("Alta") : ("No asignado")

    return(
        <div className={`bg-gree w-auto h-auto py-1 px-2 rounded-lg text-center text-white ${color}`}>
            {nombre}
      </div>
    )
}