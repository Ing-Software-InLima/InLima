export default function StatusColor({estado}){
    const color =
    estado.id == 1 ? ("bg-slate-500") : //enviado
    estado.id == 2 ? ("bg-amber-200") : //recibido
    estado.id == 3 ? ("bg-yellow-300") : //enproceso
    estado.id == 4 ? ("bg-red-600")://archivado
    ("bg-green-500") //solucionado

    return(
        <div className={`bg-gree w-auto h-auto py-1 px-2 rounded-lg text-white ${color}`}>
            {estado.nombre}
      </div>
    )
}