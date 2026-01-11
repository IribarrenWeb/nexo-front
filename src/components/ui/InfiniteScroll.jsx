import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { cn } from "../../utils/helpers";
import { Loader2 } from "lucide-react";

const InfiniteScroll = ({ ref, children, maxH, offsetH, loadMore, scrollTarget, className }) => {
    const [stop, setStop] = useState(false); // para detener la carga de mas elementos
    const [loading, setLoading] = useState(false); // para indicar que se estan cargando mas elementos

    const stateRef = useRef({ stop, loading });

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
        
        if (stateRef.current.stop || stateRef.current.loading) return;
        
        const valid = scrollHeight - scrollTop - clientHeight;
        if (scrollHeight - scrollTop - clientHeight <= offsetH) {
            console.log('scroller',{scrollTop, scrollHeight, clientHeight, stop, loading, valid});
            loadMore();
        }
    }

    // funcion para buscar y asignar el evento scroll al elemento target
    // segun el selector pasado en las props
    const setHandlerToTarget = () => {
        const elementTarget = document.querySelector(scrollTarget);
        if (elementTarget) { // si encontramos el elemento, le asignamos el evento scroll
            elementTarget.addEventListener("scroll", handleScroll);
        }
        return elementTarget;
    }

    useEffect(() => {
      stateRef.current = { stop, loading };
    }, [stop, loading]);

    useEffect(() => {
        console.log('InfiniteScroll: asignando target', scrollTarget, stop, loading);
        let targetElement = null;

        // llamamos a la funcion para asignar el evento scroll al elemento target
        if (!stop) targetElement = setHandlerToTarget();
        
        return () => {
            // limpiamos el evento scroll al desmontar el componente
            if (targetElement) {
                targetElement.removeEventListener('scroll', handleScroll);
            }
        }
    }, [scrollTarget, loadMore]); // escuchamos cambios en el elemento target

    return (
        <div className={className} style={{maxHeight: maxH, overflowY: 'auto'}}>
            {children}
            <div className={cn("w-full justify-center my-4", (!loading ? 'hidden' : 'flex'))}>
                <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
            </div>
            <div className={cn("w-full justify-center my-4", (!stop ? 'hidden' : 'flex'))}>
                <span className="text-gray-500">No hay más elementos para cargar.</span>
            </div>
        </div>
    )
}

export default InfiniteScroll;