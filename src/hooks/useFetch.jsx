import { useCallback, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; // contante con la url de la api

export const useFetch = () => {
    const validMethods = ['POST','PUT','GET','DELETE','PATCH']; // metodos valids
    
    const abortControllerRef = useRef(); // abort controller para cancelar peticiones
    const navigate = useNavigate();

    /**
     * Funcion para generar un abort y cancelar peticiones en curso
     * @param {boolean} onlyAbort 
     * @returns 
     */
    const generateAbort = (onlyAbort = false) => {
        
        // si existe un abort, abortar la peticion
        // para evitar solapar las peticiones
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        // si solo es para abortar, 
        // limpiamos y cortamos la ejecucion
        if (onlyAbort) {
            abortControllerRef.current = null;
            return;
        }

        abortControllerRef.current = new AbortController();
        
        return abortControllerRef.current.signal;
    }


    /**
     * Metodo para ejecutar las peticiones fetch
     * @param {string} url 
     * @param {string} method 
     * @param {object} data 
     * @returns 
     */
    const execute = useCallback(async (url, method = 'GET', data = {}) => {

        // validar metodo
        if (!validMethods.includes(method.toUpperCase())) throw new Error(`Metodo no valido: ${method}`);
        
        // obtener la ruta actual para redireccionar en caso de 401
        const actualPath = window.location.pathname;

        // inicializar el resultado
        const result = {
            data: null,
            error: null
        }

        try {
            const signal = generateAbort() // generar un nuevo abort controller
            const access_token = localStorage.getItem('access_token'); // obtener el token de acceso

            // inicializar las opciones de la peticion
            const options = {
              method: method.toUpperCase(),
              signal, // pasamos el signal para poder abortar la peticion
              headers: {
                'Content-Type': 'application/json',
              }
            }

            // si hay token de acceso, añadir a las cabeceras
            if (access_token) {
                options.headers['Authorization'] = `Bearer ${access_token}`;
            }

            // si el metodo no es GET, añadir el body
            if (method.toUpperCase() != 'GET') {
                options.body = JSON.stringify(data);
            } else { // si es GET, añadir los parametros a la url
                url += Object.keys(data).length ? '?' + new URLSearchParams(data).toString() : '';
            }

            // ejecutar la peticion fetch
            const res = await fetch(API_URL + url, options);
            result.data = await res.json(); // parsear la respuesta como json

            // si la respuesta no es ok, procesar el error
            if (!res.ok) {
                let message = result.data.mensaje ?? 'Ocurrio algo inesperado'; // extraer el mensaje de error
                if (res.status === 401 && actualPath != '/login') { // si es 401 (no autrizado), redirigir al login
                    navigate('/login');
                    message = 'No autorizado. Redirigiendo al login.';
                }
                throw new Error(message); // lanzar el error
            }
        } catch (error) { // capturar errores generales
            result.error = error instanceof Error ? error : new Error('Error desconocido')
            
            if (error.name === 'AbortError') result.error = null; // si es un abort, omitir el error
        }
        return result;
    }, [])

    // limpiar el abort controller al desmontar el componente
    useEffect(() => {
        return () => {
            generateAbort(true)
        }
    }, [])

    return {
        execute
    }
}