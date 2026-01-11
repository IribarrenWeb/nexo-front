import { useEffect, useImperativeHandle, useState } from "react";
import { cn } from "../../utils/helpers";
import { Loader2 } from "lucide-react";

const InfiniteScroll = ({ ref, children, maxH, offsetH, loadMore, scrollTarget, className }) => {
    const [stop, setStop] = useState(false); // para detener la carga de mas elementos
    const [loading, setLoading] = useState(false); // para indicar que se estan cargando mas elementos
    const [targetElement, setTargetElement] = useState(null); // elemento al que se le asigna el evento scroll

    // exponemos los metodos al componente padre
    useImperativeHandle(ref, () => ({
        isLoading: () => loading,
        stop: () => setStop(true),
        resume: () => setStop(false),
        loading: () => setLoading(true),
        loaded: () => setLoading(false),    
    }))

    // manejador del evento scroll para cargar mas elementos
    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        
        if (stop || loading) return;

        if (scrollHeight - scrollTop - clientHeight <= offsetH) {
            loadMore();
        }
    }

    // funcion para buscar y asignar el evento scroll al elemento target
    // segun el selector pasado en las props
    const setHandlerToTarget = () => {
        const elementTarget = document.querySelector(scrollTarget);
        if (elementTarget) { // si encontramos el elemento, le asignamos el evento scroll
            elementTarget.addEventListener("scroll", handleScroll);
            setTargetElement(elementTarget); // guardamos el elemento en el estado
            return;
        }
        setTargetElement(null); // si no encontramos el elemento, seteamos null
    }

    useEffect(() => {
        // llamamos a la funcion para asignar el evento scroll al elemento target
        setHandlerToTarget();
        return () => {

            // limpiamos el evento scroll al desmontar el componente
            if (targetElement) {
                targetElement.removeEventListener('scroll', handleScroll);
            }
        }
    }, [targetElement]); // escuchamos cambios en el elemento target

    return (
        <div className={className} style={{maxHeight: maxH, overflowY: 'auto'}}>
            {children}
            <div className={cn("w-full justify-center my-4", (!loading ? 'hidden' : 'flex'))}>
                <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
            </div>
        </div>
    )
}

export default InfiniteScroll;