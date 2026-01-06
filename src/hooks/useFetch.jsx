import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL;

export const useFetch = () => {
    const [response, setResponse] = useState({
        data: null,
        error: null
    })

    const [loading, setLoading] = useState(false)

    const validMethods = ['POST','PUT','GET','DELETE','PATCH'];
    
    const abortControllerRef = useRef();

    const generateAbort = (onlyAbort = false) => {
        
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        if (onlyAbort) {
            abortControllerRef.current = null;
            return;
        }

        abortControllerRef.current = new AbortController();
        
        return abortControllerRef.current.signal;
    }

    const execute = async (url, method = 'GET', data = {}) => {
        if (!validMethods.includes(method.toUpperCase())) throw new Error(`Metodo no valido: ${method}`);

        const result = {
            data: null,
            error: null
        }

        try {
            const signal = generateAbort()

            setLoading(true)
            
            const res = await fetch(API_URL + url, {
              method: method.toUpperCase(),
              signal,
            });

            if (!res.ok) {
                throw new Error(`Error en la url ${url} : ${res.status} -> ${res.statusText} `);
            }

            const responseData = await res.json()
            result.data = responseData
        } catch (error) {
            result.error = error instanceof Error ? error : new Error('Error desconocido')
        } finally {
            setLoading(false)
        }

        setResponse({ data: result.data, error: result.error });
    }

    useEffect(() => {
        return () => {
            generateAbort(true)
        }
    }, [url, method, data])

    return {
        response,
        loading,
        execute
    }
}