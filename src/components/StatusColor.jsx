export default function StatusColor({estado}){
    const color =
    estado === "Solucionado" ? ("bg-green-500") :
    estado === "En proceso" ? ("bg-yellow-300") : ("bg-red-600");

    return(
        <div className={`w-auto h-auto py-1 px-2 rounded-lg text-white ${color}`}>
            {estado}
      </div>
    )
}